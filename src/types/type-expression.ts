import * as ts from "typescript";
import {Type} from "./type";
import {TypeChecker} from "./../utils";

export class TypeExpression {
    private _text: string;
    private _types: Type[] = [];

    constructor(typeChecker: TypeChecker, private _tsType: ts.Type) {
        this._text = typeChecker.typeToString(_tsType);
    }

    addType(type: Type) {
        this._types.push(type);
    }

    get text() {
        return this._text;
    }

    get types() {
        return this._types;
    }

    get tsType() {
        return this._tsType;
    }
}
