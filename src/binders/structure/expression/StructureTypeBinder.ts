import {CallSignatureDefinition, TypeDefinition, TypePropertyDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";
import {StructureExpressionBinder} from "./StructureExpressionBinder";

export class StructureTypeBinder extends TypeBinder {
    constructor(private factory: StructureFactory, private text: string) {
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

    getArrayElementType(): TypeDefinition {
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
