import {TypeExpressionedDefinition} from "./../../../definitions";
import {TypeExpression} from "./../../../expressions";

export abstract class TypeExpressionedBinder {
    abstract getTypeExpression(): TypeExpression;

    bind(def: TypeExpressionedDefinition) {
        def.typeExpression = this.getTypeExpression();
    }
}
