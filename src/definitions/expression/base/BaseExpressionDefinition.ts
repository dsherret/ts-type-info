import {BaseDefinition} from "./../../base";

export class BaseExpressionDefinition extends BaseDefinition {
    // ReSharper disable once InconsistentNaming
    _text: string; // internal

    // this is done because of how text is used in TypeDefinition
    get text() {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }
}
