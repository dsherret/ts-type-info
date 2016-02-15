import {CallSignatureDefinition, IBaseNamedDefinition, TypePropertyDefinition} from "./../definitions";
import {WrappedType} from "./../wrappers";
import {ArrayExt} from "./../utils";
import {TypeExpression} from "./type-expression";

export class Type {
    callSignatures = new ArrayExt<CallSignatureDefinition>();
    definitions = new ArrayExt<IBaseNamedDefinition>();
    properties = new ArrayExt<TypePropertyDefinition>();
    typeArguments = new ArrayExt<TypeExpression>();
    text: string;

    fillTypeInformation(type: WrappedType) {
        this.text = type.getText();

        if (type.hasCallSignaturesAndProperties()) {
            this.callSignatures.push(...type.getCallSignatures().map(callSignature => new CallSignatureDefinition(callSignature)));
            this.properties.push(...type.getProperties().map(prop => new TypePropertyDefinition(prop, this)));
        }

        this.typeArguments.push(...type.getTypeArguments().map(arg => new TypeExpression(arg)));
    }

    addDefinitions(definitions: IBaseNamedDefinition[]) {
        this.definitions.push(...definitions);
    }
}
