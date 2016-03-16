import {ReturnTypedDefinition} from "./../../../definitions";
import {TypeExpression} from "./../../../expressions";

export abstract class ReturnTypedBinder {
    abstract getReturnTypeExpression(): TypeExpression;

    bind(def: ReturnTypedDefinition) {
        def.returnTypeExpression = this.getReturnTypeExpression();
    }
}
