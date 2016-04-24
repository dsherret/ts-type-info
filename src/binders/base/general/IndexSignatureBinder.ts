import {IndexSignatureDefinition, TypeExpressionDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, ReturnTypedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class IndexSignatureBinder implements IBaseBinder {
    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private returnTypedBinder: ReturnTypedBinder
    ) {
    }

    abstract getKeyName(): string;
    abstract getKeyTypeExpression(): TypeExpressionDefinition;

    bind(def: IndexSignatureDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.returnTypedBinder.bind(def);
        def.keyName = this.getKeyName();
        def.keyTypeExpression = this.getKeyTypeExpression();
    }
}
