import * as ts from "typescript";
import {TypeChecker} from "./../../utils";

export interface IExportableDefinition {
    fillIsExported(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    isExported: boolean;
}

export abstract class ExportableDefinition implements IExportableDefinition {
    isExported: boolean;

    fillIsExported(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.isExported = typeChecker.isSymbolExportOfParent(symbol);
    }
}
