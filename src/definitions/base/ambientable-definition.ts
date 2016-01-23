import * as ts from "typescript";
import {TypeChecker} from "./../../utils";

export interface IAmbientableDefinition {
    isAmbient: boolean;
    fillIsAmbient(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class AmbientableDefinition implements IAmbientableDefinition {
    isAmbient: boolean;

    fillIsAmbient(typeChecker: TypeChecker, symbol: ts.Symbol) {
        let declaration: ts.Node;

        if (typeChecker.isSymbolVariable(symbol)) {
            declaration = typeChecker.getDeclarationFromSymbol(symbol).parent.parent;
        }
        else {
            declaration = typeChecker.getDeclarationFromSymbol(symbol);
        }

        this.isAmbient = declaration.flags & ts.NodeFlags.Ambient ? true : false;
    }
}
