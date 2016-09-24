import {TypeDefinition, TypePropertyDefinition} from "./../../../../definitions";
import {StructureFactory} from "./../../../../factories";
import {BaseTypeBinder} from "./../../../base";
import {StructureExpressionBinder} from "./../StructureExpressionBinder";

export class StructureBaseTypeBinder extends BaseTypeBinder {
    constructor(private readonly factory: StructureFactory, private readonly text: string) {
        super(new StructureExpressionBinder(text));
    }

    isArrayType() {
        return /\[\]$/.test(this.text) || /^Array\<.*\>$/.test(this.text);
    }

    getArrayElementType() {
        return this.factory.getTypeFromText(this.text.replace(/\[\]$/, "").replace(/^Array\<(.*)\>$/, "$1"));
    }

    isIntersectionType() {
        return false;
    }

    isUnionType() {
        return false;
    }

    getUnionOrIntersectionTypes(): TypeDefinition[] {
        return [];
    }

    getProperties(): TypePropertyDefinition[] {
        return [];
    }

    getTypeArguments(): TypeDefinition[] {
        return [];
    }
}
