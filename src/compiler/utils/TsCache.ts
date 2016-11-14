import * as ts from "typescript";
import {KeyValueCache} from "./../../utils";
import {TsSymbol} from "./../TsSymbol";
import {TsNode} from "./../TsNode";
import {TsTypeNode} from "./../TsTypeNode";

export class TsCache {
    private readonly nodeCache = new KeyValueCache<ts.Node, TsNode>();
    private readonly typeNodeCache = new KeyValueCache<ts.TypeNode, TsTypeNode>();
    private readonly symbolCache = new KeyValueCache<ts.Symbol, TsSymbol>();

    getSymbol(symbol: ts.Symbol, createFunc: () => TsSymbol) {
        return this.symbolCache.getOrCreate(symbol, () => createFunc());
    }

    getNode(node: ts.Node, createFunc: () => TsNode) {
        return this.nodeCache.getOrCreate(node, () => createFunc());
    }

    getTypeNode(node: ts.TypeNode, createFunc: () => TsTypeNode) {
        return this.typeNodeCache.getOrCreate(node, () => createFunc());
    }
}
