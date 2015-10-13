import * as ts from "typescript";
import {Serializable} from "./../utils/decorators";

export class Type {
    private _name: string;

    constructor(typeChecker: ts.TypeChecker, type: ts.Type, node: ts.Node) {
        this._name = typeChecker.typeToString(type, node, ts.TypeFormatFlags.None);
    }

    @Serializable
    get name() {
        return this._name;
    }
}
