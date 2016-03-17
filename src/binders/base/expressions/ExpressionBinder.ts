import {ExpressionDefinition} from "./../../../definitions";

export abstract class ExpressionBinder {
    abstract getText(): string;

    bind(def: ExpressionDefinition) {
        def.text = this.getText();
    }
}
