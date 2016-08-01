import {CallSignatureDefinition, TypeDefinition, TypePropertyDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";
import {StructureExpressionBinder} from "./StructureExpressionBinder";

export class StructureTypeBinder extends TypeBinder {
    constructor(private readonly factory: StructureFactory, private readonly text: string) {
        super(new StructureExpressionBinder(text));
    }

    isArrayType() {
        return /\[\]$/.test(this.text) || /^Array\<.*\>$/.test(this.text);
    }

    isIntersectionType() {
        return false;
    }

    isUnionType() {
        return false;
    }

    getArrayElementType() {
        return this.factory.getTypeFromText(this.text.replace(/\[\]$/, "").replace(/^Array\<(.*)\>$/, "$1"));
    }

    getUnionOrIntersectionTypes(): TypeDefinition[] {
        return [];
    }

    getCallSignatures(): CallSignatureDefinition[] {
        return [];
    }

    getProperties(): TypePropertyDefinition[] {
        return [];
    }

    getTypeArguments(): TypeDefinition[] {
        return [];
    }
}
