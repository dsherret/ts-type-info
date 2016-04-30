import {ExpressionDefinition} from "./../../../definitions";
import {BaseDefinitionBinder} from "./../base";

export abstract class ExpressionBinder {
    abstract getText(): string;

    constructor(private baseDefinitionBinder: BaseDefinitionBinder) {
    }

    bind(def: ExpressionDefinition) {
        this.baseDefinitionBinder.bind(def);
        def.text = this.getText();
    }
}
