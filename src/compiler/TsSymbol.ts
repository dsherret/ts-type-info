import * as ts from "typescript";
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

        if (opts.symbol == null) {
            throw new Error("Passed in ts.Symbol cannot be null.");
        }

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
        return Object.keys(this.symbol.exports).map(memberName => {
            const memberSymbol = this.symbol.exports![memberName];
            return this.createSymbol(memberSymbol);
        });
    }

    getExportSymbolsByNameKeys() {
        const exportSymbols: { [nameKey: string]: TsSymbol; } = {};

        Object.keys(this.symbol.exports).forEach(memberName => {
            const symbol = this.createSymbol(this.symbol.exports![memberName]);
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
                exportSymbols[NameKeyUtils.getNameKeyFromName(memberName)] = this.createSymbol(this.symbol.exports![memberName]);
            }
        });

        return exportSymbols;
    }

    getExportSymbolsOfModuleByName() {
        const symbolsByName: { [name: string]: TsSymbol; } = {};

        this.typeChecker.getExportsOfModule(this.symbol).map(symbol => this.createSymbol(symbol)).forEach(symbol => {
            const name = symbol.getName();

            if (symbol.isAlias()) {
                symbol = symbol.getAliasSymbol()!;
            }

            symbolsByName[name] = symbol;
        });

        return symbolsByName;
    }

    getOnlyNode(): TsNode {
        const nodes = this.getNodes();

        if (nodes.length === 0) {
            throw new Error(`Symbol "${this.getName()}" was expected to have 1 node, but it had none.`);
        }
        else if (nodes.length > 1) {
            Logger.log(`Symbol "${this.getName()}" was expected to have 1 node, but it had ${nodes.length}.`);
        }

        return nodes[0];
    }

    isAlias() {
        return this.typeChecker.symbolHasFlag(this.symbol, ts.SymbolFlags.Alias);
    }

    isDefaultExport() {
        return this.typeChecker.isSymbolDefaultExportOfFile(this.symbol, this.sourceFile);
    }

    isExported() {
        let parentSymbol = this.getSymbolParent(this.symbol);

        if (parentSymbol == null) {
            return this.isDefaultExport();
        }
        else {
            return parentSymbol != null && parentSymbol.exports != null && parentSymbol.exports[this.symbol.name] != null;
        }
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

    @Memoize
    getType() {
        const type = ((this.symbol as any)["type"] as ts.Type);
        return this.createType(type, this.getUnderlyingNodes()[0]);
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

    private getSymbolParent(symbol: ts.Symbol) {
        return symbol == null ? null : (symbol as any).parent as ts.Symbol;
    }
}
