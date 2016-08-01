import * as ts from "typescript";
import {KeyValueCache, Logger} from "./../../utils";
import {TsType} from "./../TsType";
import {TsSymbol} from "./../TsSymbol";
import {TsNode} from "./../TsNode";
import {TsTypeChecker} from "./TsTypeChecker";

export class TsCache {
    private readonly nodeCache = new KeyValueCache<ts.Node, TsNode>();
    private readonly symbolCache = new KeyValueCache<ts.Symbol, TsSymbol>();
    private readonly typeCacheContainer = new TypeCacheContainer<TsType>();

    getSymbol(symbol: ts.Symbol, createFunc: () => TsSymbol) {
        return this.symbolCache.getOrCreate(symbol, () => createFunc());
    }

    getNode(node: ts.Node, createFunc: () => TsNode) {
        return this.nodeCache.getOrCreate(node, () => createFunc());
    }

    getType(typeChecker: TsTypeChecker, sourceFile: ts.SourceFile, tsType: ts.Type, createTsType: () => TsType) {
        const cache = this.typeCacheContainer.getCache(tsType);
        const typeText = typeChecker.typeToString(sourceFile, tsType);

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
