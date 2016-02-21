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
        let tsNodeCache = this.symbolNodeCache.get(symbol);

        if (tsNodeCache == null) {
            tsNodeCache = new KeyValueCache<ts.Node, TsSymbolNode>();
            this.symbolNodeCache.add(symbol, tsNodeCache);
        }

        let tsSymbolNode = tsNodeCache.get(node);

        if (tsSymbolNode == null) {
            tsSymbolNode = createFunc();
            tsNodeCache.add(node, tsSymbolNode);
        }

        return tsSymbolNode;
    }

    getNode(node: ts.Node, createFunc: () => TsNode) {
        let tsNode = this.nodeCache.get(node);

        if (tsNode == null) {
            tsNode = createFunc();
            this.nodeCache.add(node, tsNode);
        }

        return tsNode;
    }

    getTypeExpression(typeChecker: TsTypeChecker, sourceFile: ts.SourceFile, tsType: ts.Type, createFunc: () => ITypeExpression, createTsType: (tsType: ts.Type) => IType) {
        const typeExpressionCache = this.typeExpressionCacheContainer.getCache(tsType);
        const typeText = typeChecker.typeToString(sourceFile, tsType);
        let typeExpression = typeExpressionCache.get(typeText);

        if (typeExpression == null) {
            const types = (tsType as ts.UnionOrIntersectionType).types || [tsType];

            typeExpression = createFunc();
            typeExpressionCache.add(typeExpression.getText(), typeExpression);

            types.forEach(t => {
                tryGet(typeText, () => this.getType(typeChecker, sourceFile, t, createTsType), type => typeExpression.addType(type));
            });
        }

        return typeExpression;
    }

    private getType(typeChecker: TsTypeChecker, sourceFile: ts.SourceFile, tsType: ts.Type, createTsType: (tsType: ts.Type) => IType) {
        const cache = this.typeCacheContainer.getCache(tsType);
        const typeText = typeChecker.typeToString(sourceFile, tsType);
        let type = cache.get(typeText);

        if (type == null) {
            type = createTsType(tsType);
            cache.add(typeText, type);
        }

        return type;
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
