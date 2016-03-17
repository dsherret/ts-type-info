import {ReturnTypedDefinition, TypeExpression} from "./../../../definitions";

export abstract class ReturnTypedBinder {
    abstract getReturnTypeExpression(): TypeExpression;

    bind(def: ReturnTypedDefinition) {
        def.returnTypeExpression = this.getReturnTypeExpression();
    }
}
