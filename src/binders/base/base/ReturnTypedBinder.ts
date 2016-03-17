import {ReturnTypedDefinition, TypeExpressionDefinition} from "./../../../definitions";

export abstract class ReturnTypedBinder {
    abstract getReturnTypeExpression(): TypeExpressionDefinition;

    bind(def: ReturnTypedDefinition) {
        def.returnTypeExpression = this.getReturnTypeExpression();
    }
}
