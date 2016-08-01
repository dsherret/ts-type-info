import {ExpressionBinder} from "./../../base";
import {StructureBaseDefinitionBinder} from "./../base";

export class StructureExpressionBinder extends ExpressionBinder {
    constructor(private readonly text: string) {
        super(new StructureBaseDefinitionBinder({}));
    }

    getText() {
        return this.text;
    }
}
