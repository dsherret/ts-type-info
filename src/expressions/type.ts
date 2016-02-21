import {CallSignatureDefinition, IBaseNamedDefinition, TypePropertyDefinition} from "./../definitions";
import {IType} from "./../wrappers";
import {ArrayExt, MainCache} from "./../utils";

export class Type {
    callSignatures = new ArrayExt<CallSignatureDefinition>();
    definitions = new ArrayExt<IBaseNamedDefinition>();
    properties = new ArrayExt<TypePropertyDefinition>();
    typeArguments = new ArrayExt<Type>();
    text: string;

    fillTypeInformation(mainCache: MainCache, type: IType) {
        this.text = type.getText();

        if (type.hasCallSignaturesAndProperties()) {
            this.callSignatures.push(...type.getCallSignatures().map(callSignature => new CallSignatureDefinition(mainCache, callSignature)));
            this.properties.push(...type.getProperties().map(prop => new TypePropertyDefinition(mainCache, prop, this)));
        }

        this.typeArguments.push(...type.getTypeArguments().map(arg => mainCache.getType(arg)));
    }

    addDefinitions(definitions: IBaseNamedDefinition[]) {
        this.definitions.push(...definitions);
    }
}
