import * as ts from "typescript";

export class ArgumentDefinition {
    private _text: string;

    constructor(arg: ts.Expression) {
        this.fillName(arg);
        this.verifyIsSupported(arg);
    }

    get text() {
        return this._text;
    }

    private fillName(arg: ts.Expression) {
        this._text = (arg as any).text;
    }

    private verifyIsSupported(arg: ts.Expression) {
        if ((arg as any)["expression"] != null) {
            console.warn("Only string arguments are currently supported.");
        }
    }
}
