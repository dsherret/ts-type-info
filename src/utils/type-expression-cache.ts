import * as ts from "typescript";
import {KeyValueCache} from "./key-value-cache";
import {TypeChecker} from "./type-checker";
import {DefinitionCache} from "./definition-cache";
import {tryGet} from "./try-get";
import {TypeExpression, Type} from "./../expressions";

export class TypeExpressionCache {
    private expressionCacheContainer = new CacheContainer<TypeExpression>(this.typeChecker);
    private typeCacheContainer = new CacheContainer<Type>(this.typeChecker);
    private typeTsTypeCache = new KeyValueCache<Type, ts.Type>();

    constructor(private typeChecker: TypeChecker) {
    }

    get(tsType: ts.Type) {
        const cache = this.expressionCacheContainer.getCache(tsType);
        const name = this.typeChecker.typeToString(tsType);
        let typeExpression = cache.get(name);

        if (typeExpression == null) {
            const types = (tsType as ts.UnionOrIntersectionType).types || [tsType];

            typeExpression = new TypeExpression(this.typeChecker, tsType);
            cache.add(typeExpression.text, typeExpression);

            types.forEach(t => {
                tryGet(name, () => this.getType(t), type => typeExpression.addType(type));
            });
        }

        return typeExpression;
    }

    fillAllCachedTypesWithDefinitions(definitionCache: DefinitionCache) {
        this.typeCacheContainer.getAllCacheItems().forEach(type => {
            const tsType = this.typeTsTypeCache.get(type);
            const symbols = this.typeChecker.getSymbolsFromType(tsType);

            /* istanbul ignore else */
            if (symbols.length === 1) {
                type.fillDefinition(definitionCache.getDefinition(symbols[0]));
            }
            else if (symbols.length > 1) {
                console.warn(`Symbol length should not be greater than 1 for ${this.typeChecker.typeToString(tsType)}`);
            }
        });
    }

    private getType(tsType: ts.Type) {
        const cache = this.typeCacheContainer.getCache(tsType);
        const name = this.typeChecker.typeToString(tsType);
        let type = cache.get(name);

        if (type == null) {
            type = new Type();
            cache.add(name, type);
            type.fillTypeInformation(this.typeChecker, this, tsType);
            this.typeTsTypeCache.add(type, tsType);
        }

        return type;
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
                console.warn(`Could not get source file.`);
            }
        }

        return fileName;
    }
}
