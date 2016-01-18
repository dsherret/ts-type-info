import * as ts from "typescript";
import {TypeChecker} from "./../../utils";

export interface IExportableDefinition {
    isExported: boolean;
    fillIsExported(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class ExportableDefinition implements IExportableDefinition {
    isExported: boolean;

    fillIsExported(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.isExported = typeChecker.isSymbolExportOfParent(symbol);
    }
}
