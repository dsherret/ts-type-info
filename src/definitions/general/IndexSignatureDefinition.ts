import {applyMixins} from "./../../utils";
import {BaseDefinition, ReturnTypedDefinition, ReadonlyableDefinition} from "./../base";
import {TypeDefinition} from "./../expression";

export class IndexSignatureDefinition extends BaseDefinition implements ReturnTypedDefinition, ReadonlyableDefinition {
    keyName: string;
    keyType: TypeDefinition;

    // ReturnTypedDefinition
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    // ReadonlyableDefinition
    isReadonly: boolean;
}

applyMixins(IndexSignatureDefinition, BaseDefinition, [ReturnTypedDefinition, ReadonlyableDefinition]);
