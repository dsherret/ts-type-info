import {CallSignatureDefinition, TypeExpressionDefinition, TypePropertyDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {TypeExpressionBinder} from "./../../base";
import {StructureExpressionBinder} from "./StructureExpressionBinder";

export class StructureTypeExpressionBinder extends TypeExpressionBinder {
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

    getArrayElementTypeExpression(): TypeExpressionDefinition {
        return this.factory.getTypeExpressionFromText(this.text.replace(/\[\]$/, "").replace(/^Array\<(.*)\>$/, "$1"));
    }

    getUnionOrIntersectionTypeExpressions(): TypeExpressionDefinition[] {
        return [];
    }

    getCallSignatures(): CallSignatureDefinition[] {
        return [];
    }

    getProperties(): TypePropertyDefinition[] {
        return [];
    }

    getTypeArguments(): TypeExpressionDefinition[] {
        return [];
    }
}
