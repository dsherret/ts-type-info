import {CallSignatureDefinition, TypeDefinition, TypePropertyDefinition, TypeParameterDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";
import {StructureParameteredBinder} from "./../base";
import {StructureExpressionBinder} from "./StructureExpressionBinder";

export class StructureTypeBinder extends TypeBinder {
    constructor(private readonly factory: StructureFactory, private readonly text: string) {
        super(
            new StructureExpressionBinder(text),
            // this binder will never use the last two parameters so its safe to pass in null values like this
            // note: doing this is somewhat laziness to not have to create another binder, but that should be done
            new StructureParameteredBinder(factory, { parameters: [] }, null!, null!)
        );
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

    getTypeParameters(): TypeParameterDefinition[] {
        return [];
    }
}
