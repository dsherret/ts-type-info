import * as ts from "typescript";
import {KeyValueCache, TypeChecker, DefinitionCache} from "./../utils";
import {TypeExpression, Type} from "./../types";

export class TypeExpressionCache {
    private expressionCacheContainer = new CacheContainer<TypeExpression>(this.typeChecker);
    private typeCacheContainer = new CacheContainer<Type>(this.typeChecker);

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
                typeExpression.addType(this.getType(t));
            });
        }

        return typeExpression;
    }

    fillAllCachedTypesWithDefinitions(definitionCache: DefinitionCache) {
        this.typeCacheContainer.getAllCacheItems().forEach(type => {
            const symbols = this.typeChecker.getSymbolsFromType(type.tsType);

            if (symbols.length === 1) {
                type.fillDefinition(definitionCache.getDefinition(symbols[0]));
            }
            else if (symbols.length > 1) {
                console.warn(`Symbol length should not be greater than 1 for ${this.typeChecker.typeToString(type.tsType)}`);
            }
        });
    }

    private getType(tsType: ts.Type) {
        const cache = this.typeCacheContainer.getCache(tsType);
        const name = this.typeChecker.typeToString(tsType);
        let type = cache.get(name);

        if (type == null) {
            type = new Type(tsType);
            cache.add(name, type);
            type.fillTypeInformation(this.typeChecker, this);
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
        return this.typeCache.getAll();
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

            if (sourceFile != null) {
                fileName = sourceFile.fileName;
            }
        }

        return fileName;
    }
}
