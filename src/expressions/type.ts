import {CallSignatureDefinition, IBaseNamedDefinition, TypePropertyDefinition} from "./../definitions";
import {IType} from "./../wrappers";
import {ArrayExt} from "./../utils";
import {IDefinitionFactory} from "./../factories";

export class Type {
    callSignatures = new ArrayExt<CallSignatureDefinition>();
    definitions = new ArrayExt<IBaseNamedDefinition>();
    properties = new ArrayExt<TypePropertyDefinition>();
    typeArguments = new ArrayExt<Type>();
    text: string;

    fillTypeInformation(definitionFactory: IDefinitionFactory, type: IType) {
        this.text = type.getText();

        if (type.hasCallSignaturesAndProperties()) {
            this.callSignatures.push(...type.getCallSignatures().map(callSignature => new CallSignatureDefinition(definitionFactory, callSignature)));
            this.properties.push(...type.getProperties().map(prop => new TypePropertyDefinition(definitionFactory, prop, this)));
        }

        this.typeArguments.push(...type.getTypeArguments().map(arg => definitionFactory.getType(arg)));
    }

    addDefinitions(definitions: IBaseNamedDefinition[]) {
        this.definitions.push(...definitions);
    }
}
