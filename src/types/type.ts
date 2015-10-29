import * as ts from "typescript";
import {TypeChecker, Serializable} from "./../utils";

export class Type {
    private _name: string;

    constructor(typeChecker: TypeChecker, private _tsType: ts.Type, node: ts.Node) {
        this._name = typeChecker.typeToString(_tsType);
    }

    @Serializable
    get name() {
        return this._name;
    }

    get tsType() {
        return this._tsType;
    }
}
