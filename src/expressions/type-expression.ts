import * as ts from "typescript";
import {Type} from "./type";
import {TypeChecker} from "./../utils";

export class TypeExpression {
    text: string;
    types: Type[] = [];

    constructor(typeChecker: TypeChecker, tsType: ts.Type) {
        this.text = typeChecker.typeToString(tsType);
    }

    addType(type: Type) {
        this.types.push(type);
    }
}
