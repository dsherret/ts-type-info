import * as ts from "typescript";
import {TypeChecker} from "./../../utils";

export interface IExportableDefinition {
    fillIsExported(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    isExported: boolean;
}

export abstract class ExportableDefinition implements IExportableDefinition {
    private _isExported: boolean;

    fillIsExported(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._isExported = typeChecker.isSymbolExportOfFile(symbol, typeChecker.getSourceFileOfSymbol(symbol));
    }

    get isExported() {
        return this._isExported;
    }
}
