import {TypeDefinition, CallSignatureDefinition, TypePropertyDefinition} from "./../../../definitions";

export abstract class TypeBinder {
    abstract getText(): string;
    abstract getCallSignatures(): CallSignatureDefinition[];
    abstract getProperties(): TypePropertyDefinition[];
    abstract getTypeArguments(): TypeDefinition[];

    bind(def: TypeDefinition) {
        def.text = this.getText();
        def.callSignatures.push(...this.getCallSignatures());
        def.properties.push(...this.getProperties());
        def.typeArguments.push(...this.getTypeArguments());
    }
}
