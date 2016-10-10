import * as ts from "typescript";
import {Logger} from "./../../utils";

export class TsTypeChecker {
    constructor(private readonly typeChecker: ts.TypeChecker) {
    }

    typeToString(type: ts.Type, node: ts.Node | null) {
        let formatFlags = (ts.TypeFormatFlags.UseTypeOfFunction | ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType |
            ts.TypeFormatFlags.WriteTypeArgumentsOfSignature) as ts.TypeFormatFlags;

        if (node != null && node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
            formatFlags |= ts.TypeFormatFlags.InTypeAlias;
        }

        return this.typeChecker.typeToString(type, node || undefined, formatFlags);
    }

    getSyntaxKindAsString(kind: ts.SyntaxKind) {
        return (ts as any).SyntaxKind[kind] as string;
    }

    getConstantValue(node: ts.Node) {
        return this.typeChecker.getConstantValue(node as ts.ElementAccessExpression);
    }

    getReturnTypeOfSignature(signature: ts.Signature) {
        return this.typeChecker.getReturnTypeOfSignature(signature);
    }

    getTypeAtLocation(node: ts.Node) {
        return this.typeChecker.getTypeAtLocation(node);
    }

    getDeclarationFromSymbol(symbol: ts.Symbol) {
        if (symbol.valueDeclaration != null) {
            return symbol.valueDeclaration;
        }
        else {
            const declarations = symbol.getDeclarations();

            /* istanbul ignore next */
            if (declarations == null) {
                throw new Error(`Declaration should not be null for symbol: ${symbol.name}`);
            }
            else if (declarations.length > 1) {
                Logger.warn(`Not implemented. Symbol has more than one declaration: ${symbol.name}`);
            }
            else if (declarations.length === 0) {
                throw new Error(`Declaration length should not be 0 for symbol: ${symbol.name}`);
            }

            return declarations[0];
        }
    }

    getAliasedSymbol(symbol: ts.Symbol): ts.Symbol | null {
        if (this.symbolHasFlag(symbol, ts.SymbolFlags.Alias)) {
            return this.typeChecker.getAliasedSymbol(symbol);
        }
        else {
            return null;
        }
    }

    getLocalSymbolFromNode(node: ts.Node) {
        return (node as any)["localSymbol"] as ts.Symbol;
    }

    getLocalSymbolsFromNode(node: ts.Node) {
        const locals = (node as any).locals as { [name: string]: ts.Symbol };

        /* istanbul ignore if */
        if (locals == null) {
            return [] as ts.Symbol[];
        }
        else {
            return Object.keys(locals).map(key => {
                const symbol = locals[key];
                const exportSymbol = (symbol as any).exportSymbol as ts.Symbol;

                return exportSymbol || symbol;
            });
        }
    }

    getReturnTypeOfNode(node: ts.Node) {
        return this.typeChecker.getReturnTypeOfSignature(this.getSignatureFromNode(node));
    }

    getSignatureFromNode(node: ts.Node) {
        return this.typeChecker.getSignatureFromDeclaration(node as ts.SignatureDeclaration);
    }

    getSymbolAtLocation(node: ts.Node) {
        return (node as any).symbol as ts.Symbol || this.typeChecker.getSymbolAtLocation(node);
    }

    getExportsOfModule(symbol: ts.Symbol) {
        return this.typeChecker.getExportsOfModule(symbol);
    }

    /* istanbul ignore next */
    getInternalTypeCheckerForTesting() {
        // get the type checker for quick testing purposes.
        // this should never be used in the code!
        return this.typeChecker;
    }

    isSymbolNamedExportOfFile(symbol: ts.Symbol, file: ts.SourceFile) {
        const fileSymbol = this.getSymbolAtLocation(file);

        // when a file doesn't have exports the symbol will be null
        return fileSymbol != null && fileSymbol.exports![symbol.name] != null && symbol.name !== "default";
    }

    isSymbolDefaultExportOfFile(symbol: ts.Symbol, file: ts.SourceFile) {
        const fileSymbol = this.getSymbolAtLocation(file);
        let isDefaultExportOfFile = false;

        if (fileSymbol != null) {
            const defaultExport = fileSymbol.exports!["default"];

            if (defaultExport != null) {
                isDefaultExportOfFile = defaultExport === symbol || this.getAliasedSymbol(defaultExport) === symbol;
            }
        }

        return isDefaultExportOfFile;
    }

    symbolHasFlag(symbol: ts.Symbol, flag: ts.SymbolFlags) {
        return (symbol.getFlags() & flag) !== 0;
    }
}
