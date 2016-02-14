import {CallSignatureDefinition, IBaseNamedDefinition, TypePropertyDefinition} from "./../definitions";
import {WrappedType} from "./../wrappers";
import {TypeExpression} from "./type-expression";

export class Type {
    callSignatures: CallSignatureDefinition[];
    definitions: IBaseNamedDefinition[];
    properties: TypePropertyDefinition[];
    typeArguments: TypeExpression[];
    text: string;

    fillTypeInformation(type: WrappedType) {
        this.text = type.getText();

        if (type.hasCallSignaturesAndProperties()) {
            this.callSignatures = type.getCallSignatures().map(callSignature => new CallSignatureDefinition(callSignature));
            this.properties = type.getProperties().map(prop => new TypePropertyDefinition(prop, this));
        }
        else {
            this.callSignatures = [];
            this.properties = [];
        }

        this.typeArguments = type.getTypeArguments().map(arg => new TypeExpression(arg));
    }

    addDefinitions(definitions: IBaseNamedDefinition[]) {
        this.definitions = this.definitions || [];
        this.definitions.push.apply(this.definitions, definitions);
    }
}
