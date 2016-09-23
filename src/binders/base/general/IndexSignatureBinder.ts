import {IndexSignatureDefinition, TypeNodeDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, ReturnTypedBinder, ReadonlyableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class IndexSignatureBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly returnTypedBinder: ReturnTypedBinder,
        private readonly readonlyableBinder: ReadonlyableBinder
    ) {
    }

    abstract getKeyName(): string;
    abstract getKeyType(): TypeNodeDefinition;

    bind(def: IndexSignatureDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.returnTypedBinder.bind(def);
        this.readonlyableBinder.bind(def);
        def.keyName = this.getKeyName();
        def.keyType = this.getKeyType();
    }
}
