import * as ts from "typescript";
import {Serializable} from "./../utils/decorators";

export class Type {
    private _name: string;

    constructor(typeChecker: ts.TypeChecker, private _tsType: ts.Type, node: ts.Node) {
        this._name = typeChecker.typeToString(_tsType, node, ts.TypeFormatFlags.None);
    }

    @Serializable
    get name() {
        return this._name;
    }

    get tsType() {
        return this._tsType;
    }
}
