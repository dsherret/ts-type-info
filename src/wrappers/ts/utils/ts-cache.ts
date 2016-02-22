import * as ts from "typescript";
import {KeyValueCache, tryGet, Logger} from "./../../../utils";
import {IType} from "./../../type";
import {ITypeExpression} from "./../../type-expression";
import {TsSymbolNode} from "./../ts-symbol-node";
import {TsNode} from "./../ts-node";
import {TsTypeChecker} from "./ts-type-checker";

export class TsCache {
    private symbolNodeCache = new KeyValueCache<ts.Symbol, KeyValueCache<ts.Node, TsSymbolNode>>();
    private nodeCache = new KeyValueCache<ts.Node, TsNode>();
    private typeExpressionCacheContainer = new TypeCacheContainer<ITypeExpression>();
    private typeCacheContainer = new TypeCacheContainer<IType>();

    getSymbolNode(symbol: ts.Symbol, node: ts.Node, createFunc: () => TsSymbolNode) {
        let tsNodeCache = this.symbolNodeCache.getOrCreate(symbol, () => new KeyValueCache<ts.Node, TsSymbolNode>());
        let tsSymbolNode = tsNodeCache.getOrCreate(node, () => createFunc());
        return tsSymbolNode;
    }

    getNodeOrCreate(node: ts.Node, createFunc: () => TsNode) {
        return this.nodeCache.getOrCreate(node, () => createFunc());
    }

    getTypeExpression(typeChecker: TsTypeChecker, sourceFile: ts.SourceFile, tsType: ts.Type, createFunc: () => ITypeExpression, createTsType: (tsType: ts.Type) => IType) {
        const typeExpressionCache = this.typeExpressionCacheContainer.getCache(tsType);
        const typeText = typeChecker.typeToString(sourceFile, tsType);

        return typeExpressionCache.getOrCreate(typeText, () => createFunc(), typeExpression => {
            const types = (tsType as ts.UnionOrIntersectionType).types || [tsType];

            types.forEach(t => {
                tryGet(typeText, () => this.getType(typeChecker, sourceFile, t, createTsType), type => typeExpression.addType(type));
            });
        });
    }

    private getType(typeChecker: TsTypeChecker, sourceFile: ts.SourceFile, tsType: ts.Type, createTsType: (tsType: ts.Type) => IType) {
        const cache = this.typeCacheContainer.getCache(tsType);
        const typeText = typeChecker.typeToString(sourceFile, tsType);

        return cache.getOrCreate(typeText, () => createTsType(tsType));
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
