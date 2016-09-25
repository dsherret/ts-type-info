import * as ts from "typescript";
import {KeyValueCache, Logger} from "./../../utils";
import {TsType} from "./../TsType";
import {TsSymbol} from "./../TsSymbol";
import {TsNode} from "./../TsNode";
import {TsTypeNode} from "./../TsTypeNode";
import {TsTypeChecker} from "./TsTypeChecker";

export class TsCache {
    private readonly nodeCache = new KeyValueCache<ts.Node, TsNode>();
    private readonly typeNodeCache = new KeyValueCache<ts.TypeNode, TsTypeNode>();
    private readonly symbolCache = new KeyValueCache<ts.Symbol, TsSymbol>();
    private readonly typeCacheContainer = new TypeCacheContainer<TsType>();

    getSymbol(symbol: ts.Symbol, createFunc: () => TsSymbol) {
        return this.symbolCache.getOrCreate(symbol, () => createFunc());
    }

    getNode(node: ts.Node, createFunc: () => TsNode) {
        return this.nodeCache.getOrCreate(node, () => createFunc());
    }

    getTypeNode(node: ts.TypeNode, createFunc: () => TsTypeNode) {
        return this.typeNodeCache.getOrCreate(node, () => createFunc());
    }

    getType(typeChecker: TsTypeChecker, type: ts.Type, node: ts.Node, createTsType: () => TsType) {
        const cache = this.typeCacheContainer.getCache(type);
        const typeText = typeChecker.typeToString(type, node);

        return cache.getOrCreate(typeText, () => createTsType());
    }
}

class TypeCacheContainer<T> {
    private readonly fileCache = new KeyValueCache<string, KeyValueCache<string, T>>();
    private readonly typeCache = new KeyValueCache<string, T>();

    getCache(tsType: ts.Type) {
        const fileName = this.getFileName(tsType);
        return fileName == null ? this.typeCache : this.getFileCache(fileName);
    }

    private getFileCache(fileName: string) {
        return this.fileCache.getOrCreate(fileName, () => new KeyValueCache<string, T>());
    }

    private getFileName(tsType: ts.Type) {
        let fileName: string | null = null;
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
