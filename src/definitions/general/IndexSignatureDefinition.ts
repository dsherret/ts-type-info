import {applyMixins} from "./../../utils";
import {BaseDefinition, DefinitionType, ReturnTypedDefinition, ReadonlyableDefinition} from "./../base";
import {TypeNodeDefinition} from "./../expression";

export class IndexSignatureDefinition extends BaseDefinition implements ReturnTypedDefinition, ReadonlyableDefinition {
    keyName: string;
    keyType: TypeNodeDefinition;

    constructor() {
        super(DefinitionType.IndexSignature);
    }

    // ReturnTypedDefinition
    returnType: TypeNodeDefinition;
    setReturnType: (text: string) => this;
    // ReadonlyableDefinition
    isReadonly: boolean;
}

applyMixins(IndexSignatureDefinition, BaseDefinition, [ReturnTypedDefinition, ReadonlyableDefinition]);
