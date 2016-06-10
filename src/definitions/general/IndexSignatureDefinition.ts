import {applyMixins} from "./../../utils";
import {BaseDefinition, DefinitionType, ReturnTypedDefinition} from "./../base";
import {TypeDefinition} from "./../expression";

export class IndexSignatureDefinition extends BaseDefinition implements ReturnTypedDefinition {
    keyName: string;
    keyType: TypeDefinition;

    constructor() {
        super(DefinitionType.IndexSignature);
    }

    // ReturnTypedDefinition
    returnType: TypeDefinition;
    setReturnType: (text: string) => any;
}

applyMixins(IndexSignatureDefinition, BaseDefinition, [ReturnTypedDefinition]);
