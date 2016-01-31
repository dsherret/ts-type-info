import * as ts from "typescript";
import {TypeChecker} from "./../../utils";

export interface IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class ExportableDefinition implements IExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;

    fillExportable(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const symbolSourceFile = typeChecker.getSourceFileOfSymbol(symbol);
        this.isExported = typeChecker.isSymbolExportOfParent(symbol);
        this.isNamedExportOfFile = typeChecker.isSymbolNamedExportOfFile(symbol, symbolSourceFile);
        this.isDefaultExportOfFile = typeChecker.isSymbolDefaultExportOfFile(symbol, symbolSourceFile);
    }
}
