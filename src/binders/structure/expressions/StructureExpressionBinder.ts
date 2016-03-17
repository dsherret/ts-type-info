import {ExpressionBinder} from "./../../base";

export class StructureExpressionBinder extends ExpressionBinder {
    constructor(private text: string) {
        super();
    }

    getText() {
        return this.text;
    }
}
