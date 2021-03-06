﻿import * as ts from "typescript";
import {Logger, Memoize} from "./../utils";
import {NameKeyUtils} from "./utils";
import {TsNode} from "./TsNode";
import {TsType} from "./TsType";
import {TsSourceFileChild, TsSourceFileChildOptions} from "./TsSourceFileChild";

interface TsSymbolOptions extends TsSourceFileChildOptions {
    symbol: ts.Symbol;
}

export class TsSymbol extends TsSourceFileChild {
    private readonly symbol: ts.Symbol;

    constructor(opts: TsSymbolOptions) {
        super(opts);

        if (opts.symbol == null)
            throw new Error("Passed in ts.Symbol cannot be null.");

        this.symbol = opts.symbol;
    }

    getName() {
        return this.symbol.getName();
    }

    getAliasSymbol() {
        const tsSymbol = this.typeChecker.getAliasedSymbol(this.symbol);
        return tsSymbol == null ? null : this.createSymbol(tsSymbol);
    }

    getExportSymbols() {
        const symbols: TsSymbol[] = [];

        if (this.symbol.exports == null)
            return symbols;

        this.symbol.exports.forEach(symbol => {
            symbols.push(this.createSymbol(symbol));
        });

        return symbols;
    }

    getExportSymbolsByNameKeys() {
        const exportSymbols: { [nameKey: string]: TsSymbol; } = {};

        if (this.symbol.exports == null)
            return exportSymbols;

        this.symbol.exports.forEach((value, memberName) => {
            const symbol = this.createSymbol(value);
            const isStarExport = memberName === "__export";

            if (isStarExport) {
                symbol.getNodes().forEach(node => {
                    const moduleSpecifierSymbol = node.getModuleSpecifierSymbol()!;
                    const starSymbolsByNameKeys = moduleSpecifierSymbol.getExportSymbolsByNameKeys();

                    Object.keys(starSymbolsByNameKeys).forEach(memberNameKey => {
                        exportSymbols[memberNameKey] = starSymbolsByNameKeys[memberNameKey];
                    });
                });
            }
            else {
                exportSymbols[NameKeyUtils.getNameKeyFromName(memberName)] = this.createSymbol(this.symbol.exports!.get(memberName));
            }
        });

        return exportSymbols;
    }

    getExportSymbolsOfModuleByName() {
        const symbolsByName: { [name: string]: TsSymbol; } = {};

        this.typeChecker.getExportsOfModule(this.symbol).map(symbol => this.createSymbol(symbol)).forEach(symbol => {
            const name = symbol.getName();

            if (symbol.isAlias())
                symbol = symbol.getAliasSymbol()!;

            symbolsByName[name] = symbol;
        });

        return symbolsByName;
    }

    getOnlyNode(): TsNode {
        const nodes = this.getNodes();

        if (nodes.length === 0)
            throw new Error(`Symbol "${this.getName()}" was expected to have 1 node, but it had none.`);
        else if (nodes.length > 1)
            Logger.log(`Symbol "${this.getName()}" was expected to have 1 node, but it had ${nodes.length}.`);

        return nodes[0];
    }

    isAlias() {
        return this.typeChecker.symbolHasFlag(this.symbol, ts.SymbolFlags.Alias);
    }

    isFileSymbol() {
        const declaration = this.symbol.getDeclarations()[0];

        if (declaration == null)
            return false;

        return declaration.kind === ts.SyntaxKind.SourceFile;
    }

    isDefaultExport() {
        return this.typeChecker.isSymbolDefaultExportOfFile(this.symbol, this.sourceFile);
    }

    isExported() {
        const parentSymbol = this.getParentOfSymbol(this.symbol);

        if (parentSymbol == null)
            return this.isDefaultExport();
        else
            return parentSymbol != null && parentSymbol.exports != null && parentSymbol.exports.get(this.symbol.name) != null;
    }

    isExportStar() {
        return (this.symbol.getFlags() & ts.SymbolFlags.ExportStar) !== 0;
    }

    isNamedExport() {
        return this.typeChecker.isSymbolNamedExportOfFile(this.symbol, this.sourceFile);
    }

    hasGetAccessor() {
        return (this.symbol.flags & ts.SymbolFlags.GetAccessor) !== 0;
    }

    hasSetAccessor() {
        return (this.symbol.flags & ts.SymbolFlags.SetAccessor) !== 0;
    }

    isPropertyOptional() {
        const nodes = this.getNodes();
        if (nodes.length === 1)
            return nodes[0].isPropertyOptional();

        const bindingElement = ((this.symbol as any)["bindingElement"] as ts.BindingElement);
        if (bindingElement != null) {
            if (bindingElement.initializer != null || bindingElement.dotDotDotToken != null)
                return true;
        }

        return false;
    }

    isPropertyReadonly() {
        const nodes = this.getNodes();
        return (nodes.length === 1) ? nodes[0].isPropertyReadonly() : false;
    }

    getParentSymbol() {
        const parentSymbol = this.getParentOfSymbol(this.symbol);
        return parentSymbol == null ? null : this.createSymbol(parentSymbol);
    }

    @Memoize
    getType() {
        const node = this.getUnderlyingNodes()[0];
        let type = ((this.symbol as any)["type"] as ts.Type);
        if (type == null)
            type = this.typeChecker.getTypeOfSymbolAtLocation(this.symbol, node);
        return this.createType(type, node);
    }

    @Memoize
    getNodes(): TsNode[] {
        return this.getUnderlyingNodes().map(declaration => this.createNode(declaration));
    }

    @Memoize
    private getUnderlyingNodes() {
        return this.symbol.getDeclarations() || [];
    }

    private createSymbol(symbol: ts.Symbol): TsSymbol {
        return this.tsCache.getSymbol(symbol, () => new TsSymbol({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            symbol,
            tsSourceFile: this.tsSourceFile
        }));
    }

    private createNode(node: ts.Node): TsNode {
        return this.tsCache.getNode(node, () => new TsNode({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            tsCache: this.tsCache,
            node,
            tsSourceFile: this.tsSourceFile
        }, this));
    }

    private createType(type: ts.Type, node: ts.Node | null): TsType {
        return new TsType({
            sourceFile: this.sourceFile,
            typeChecker: this.typeChecker,
            type,
            node,
            tsCache: this.tsCache,
            tsSourceFile: this.tsSourceFile
        });
    }

    private getParentOfSymbol(symbol: ts.Symbol) {
        return symbol == null ? null : (symbol as any).parent as ts.Symbol;
    }
}
