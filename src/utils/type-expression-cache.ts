import * as ts from "typescript";
import {TypeExpression, Type} from "./../expressions";
import {WrappedType} from "./../wrappers";
import {KeyValueCache} from "./key-value-cache";
import {TypeChecker} from "./type-checker";
import {DefinitionCache} from "./definition-cache";
import {tryGet} from "./try-get";
import {Logger} from "./logger";

export class TypeExpressionCache {
    private typeExpressionCacheContainer = new CacheContainer<TypeExpression>(this.typeChecker);
    private typeCacheContainer = new CacheContainer<Type>(this.typeChecker);
    private typeTsTypeCache = new KeyValueCache<Type, ts.Type>();

    constructor(private typeChecker: TypeChecker, private definitionCache: DefinitionCache) {
    }

    get(tsType: ts.Type, sourceFile: ts.SourceFile) {
        const typeExpressionCache = this.typeExpressionCacheContainer.getCache(tsType);
        const typeText = this.typeChecker.typeToString(tsType);
        let typeExpression = typeExpressionCache.get(typeText);

        if (typeExpression == null) {
            const types = (tsType as ts.UnionOrIntersectionType).types || [tsType];

            typeExpression = new TypeExpression(this.getTypeWrapperFromTsTypeAndSourceFile(tsType, sourceFile));
            typeExpressionCache.add(typeExpression.text, typeExpression);

            types.forEach(t => {
                tryGet(typeText, () => this.getType(t, sourceFile), type => typeExpression.addType(type));
            });
        }

        return typeExpression;
    }

    fillAllCachedTypesWithDefinitions() {
        this.typeCacheContainer.getAllCacheItems().forEach(type => {
            const tsType = this.typeTsTypeCache.get(type);
            const symbols = this.typeChecker.getSymbolsFromType(tsType);

            /* istanbul ignore else */
            symbols.forEach(s => {
                type.addDefinitions(this.definitionCache.getDefinitionsBySymbol(s));
            });
        });
    }

    private getType(tsType: ts.Type, sourceFile: ts.SourceFile) {
        const cache = this.typeCacheContainer.getCache(tsType);
        const name = this.typeChecker.typeToString(tsType);
        let type = cache.get(name);

        if (type == null) {
            type = new Type();
            cache.add(name, type);

            type.fillTypeInformation(this.getTypeWrapperFromTsTypeAndSourceFile(tsType, sourceFile));
            this.typeTsTypeCache.add(type, tsType);
        }

        return type;
    }

    private getTypeWrapperFromTsTypeAndSourceFile(tsType: ts.Type, sourceFile: ts.SourceFile) {
        return new WrappedType({
            typeChecker: this.typeChecker,
            sourceFile: sourceFile,
            tsType: tsType
        });
    }
}

class CacheContainer<T> {
    private fileCache = new KeyValueCache<string, KeyValueCache<string, T>>();
    private typeCache = new KeyValueCache<string, T>();

    constructor(private typeChecker: TypeChecker) {
    }

    getCache(tsType: ts.Type) {
        const fileName = this.getFileName(tsType);

        return fileName == null ? this.typeCache : this.getFileCache(fileName);
    }

    getAllCacheItems() {
        const a: T[] = [];

        a.push.apply(a, this.typeCache.getAll());
        this.fileCache.getAll().forEach(c => {
            a.push.apply(a, c.getAll());
        });

        return a;
    }

    private getFileCache(fileName: string) {
        let fileCache = this.fileCache.get(fileName);

        if (fileCache == null) {
            fileCache = new KeyValueCache<string, T>();
            this.fileCache.add(fileName, fileCache);
        }

        return fileCache;
    }

    private getFileName(tsType: ts.Type) {
        let fileName: string = null;
        const symbol = tsType.getSymbol();

        if (symbol != null && symbol.valueDeclaration != null) {
            const sourceFile = symbol.valueDeclaration.getSourceFile();

            /* istanbul ignore else */
            if (sourceFile != null) {
                fileName = sourceFile.fileName;
            }
            else {
                Logger.warn(`Could not get source file.`);
            }
        }

        return fileName;
    }
}
