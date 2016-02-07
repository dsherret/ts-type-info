import * as ts from "typescript";
import {TypeChecker} from "./../../utils";

export interface IAbstractableDefinition {
    isAbstract: boolean;
    fillAbstractable(typeChecker: TypeChecker, symbol: ts.Symbol): void;
}

export abstract class AbstractableDefinition implements IAbstractableDefinition {
    isAbstract: boolean;

    fillAbstractable(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const nodeFlags = typeChecker.getDeclarationFromSymbol(symbol).flags;
        this.isAbstract = (nodeFlags & ts.NodeFlags.Abstract) === ts.NodeFlags.Abstract;
    }
}
