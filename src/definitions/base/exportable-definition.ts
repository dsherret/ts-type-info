import * as ts from "typescript";
import {TypeChecker} from "./../../utils";

export interface IExportableDefinition {
    isExported: boolean;
    hasExportKeyword: boolean;
    fillExportable(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class ExportableDefinition implements IExportableDefinition {
    isExported: boolean;
    hasExportKeyword: boolean;

    fillExportable(typeChecker: TypeChecker, symbol: ts.Symbol) {
        let declaration: ts.Node;

        if (typeChecker.isSymbolVariable(symbol)) {
            declaration = typeChecker.getDeclarationFromSymbol(symbol).parent.parent;
        }
        else {
            declaration = typeChecker.getDeclarationFromSymbol(symbol);
        }

        this.hasExportKeyword = declaration.flags & ts.NodeFlags.Export ? true : false;
        this.isExported = typeChecker.isSymbolExportOfParent(symbol);
    }
}
