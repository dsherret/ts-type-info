import {StructureFactory} from "./../../../factories";
import {IndexSignatureStructure} from "./../../../structures";
import {IndexSignatureBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureReturnTypedBinder, StructureReadonlyableBinder} from "./../base";

export class StructureIndexSignatureBinder extends IndexSignatureBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: IndexSignatureStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureReturnTypedBinder(factory, structure),
            new StructureReadonlyableBinder(structure)
        );
    }

    getKeyName() {
        return this.structure.keyName || "";
    }

    getKeyType() {
        // default to string for the key type
        return this.factory.getTypeFromText(this.structure.keyType || "string");
    }
}
