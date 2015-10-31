import * as ts from "typescript";
import {Serializable} from "./../utils";

export class ArgumentDefinition {
    private _text: string;

    constructor(arg: ts.Expression) {
        this.fillName(arg);
        this.isSupported(arg);
    }

    @Serializable
    get text() {
        return this._text;
    }

    private fillName(arg: ts.Expression) {
        this._text = (arg as any).text;
    }

    private isSupported(arg: ts.Expression) {
        if ((arg as any)["expression"] != null) {
            throw "Only string arguments are currently supported.";
        }
    }
}
