import * as ts from "typescript";
import {KeyValueCache, tryGet, Logger} from "./../../utils";
import {TsType} from "./../TsType";
import {TsTypeExpression} from "./../TsTypeExpression";
import {TsSymbol} from "./../TsSymbol";
import {TsNode} from "./../TsNode";
import {TsTypeChecker} from "./TsTypeChecker";

export class TsCache {
    private nodeCache = new KeyValueCache<ts.Node, TsNode>();
    private symbolCache = new KeyValueCache<ts.Symbol, TsSymbol>();
    private typeExpressionCacheContainer = new TypeCacheContainer<TsTypeExpression>();
    private typeCacheContainer = new TypeCacheContainer<TsType>();

    getSymbol(symbol: ts.Symbol, createFunc: () => TsSymbol) {
        return this.symbolCache.getOrCreate(symbol, () => createFunc());
    }

    getNode(node: ts.Node, createFunc: () => TsNode) {
        return this.nodeCache.getOrCreate(node, () => createFunc());
    }

    getTypeExpression(typeChecker: TsTypeChecker, sourceFile: ts.SourceFile, tsType: ts.Type, createFunc: () => TsTypeExpression, createTsType: (tsType: ts.Type) => TsType) {
        const typeExpressionCache = this.typeExpressionCacheContainer.getCache(tsType);
        const typeText = typeChecker.typeToString(sourceFile, tsType);

        return typeExpressionCache.getOrCreate(typeText, () => createFunc(), typeExpression => {
            const types = (tsType as ts.UnionOrIntersectionType).types || [tsType];

            types.forEach(t => {
                tryGet(typeText, () => this.getType(typeChecker, sourceFile, t, () => createTsType(t)), type => typeExpression.addType(type));
            });
        });
    }

    getType(typeChecker: TsTypeChecker, sourceFile: ts.SourceFile, tsType: ts.Type, createTsType: () => TsType) {
        const cache = this.typeCacheContainer.getCache(tsType);
        const typeText = typeChecker.typeToString(sourceFile, tsType);

        return cache.getOrCreate(typeText, () => createTsType());
    }
}

class TypeCacheContainer<T> {
    private fileCache = new KeyValueCache<string, KeyValueCache<string, T>>();
    private typeCache = new KeyValueCache<string, T>();

    getCache(tsType: ts.Type) {
        const fileName = this.getFileName(tsType);
        return fileName == null ? this.typeCache : this.getFileCache(fileName);
    }

    private getFileCache(fileName: string) {
        return this.fileCache.getOrCreate(fileName, () => new KeyValueCache<string, T>());
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
