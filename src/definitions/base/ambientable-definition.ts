import * as ts from "typescript";
import {TypeChecker} from "./../../utils";

export interface IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillIsAmbient(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class AmbientableDefinition implements IAmbientableDefinition {
    isAmbient: boolean;
    hasDeclareKeyword: boolean;

    fillIsAmbient(typeChecker: TypeChecker, symbol: ts.Symbol) {
        let declaration: ts.Node;

        if (typeChecker.isSymbolVariable(symbol)) {
            declaration = typeChecker.getDeclarationFromSymbol(symbol).parent.parent;
        }
        else {
            declaration = typeChecker.getDeclarationFromSymbol(symbol);
        }

        this.hasDeclareKeyword = declaration.flags & ts.NodeFlags.Ambient ? true : false;

        if (this.hasDeclareKeyword || typeChecker.isSymbolInterface(symbol)) {
            this.isAmbient = true;
        }
        else {
            this.isAmbient = this.isAnyParentAmbient(declaration);
        }
    }

    private isAnyParentAmbient(declaration: ts.Node) {
        while (declaration.parent != null) {
            if (declaration.parent.flags & ts.NodeFlags.Ambient) {
                return true;
            }

            declaration = declaration.parent;
        }

        return false;
    }
}
