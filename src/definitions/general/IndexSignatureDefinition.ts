import {applyMixins} from "./../../utils";
import {BaseDefinition, ReturnTypedDefinition, ReadonlyableDefinition} from "./../base";
import {TypeDefinition} from "./../expression";
import {MainFactory} from "./../../factories";

export class IndexSignatureDefinition extends BaseDefinition implements ReturnTypedDefinition, ReadonlyableDefinition {
    keyName: string;
    keyType: TypeDefinition;

    setKeyType(text: string) {
        this.keyType = new MainFactory().createStructureFactory().getTypeFromText(text);
        return this;
    }

    // ReturnTypedDefinition
    returnType: TypeDefinition;
    setReturnType: (text: string) => this;
    // ReadonlyableDefinition
    isReadonly: boolean;
}

applyMixins(IndexSignatureDefinition, BaseDefinition, [ReturnTypedDefinition, ReadonlyableDefinition]);
