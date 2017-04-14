import {CallSignatureDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";
import {StructureBaseTypeBinder} from "./base";

export class StructureTypeBinder extends TypeBinder {
    constructor(private readonly factory: StructureFactory, private readonly text: string) {
        super(new StructureBaseTypeBinder(factory, text));
    }

    getCallSignatures(): CallSignatureDefinition[] {
        return [];
    }

    getTypeNode() {
        return null;
    }
}
