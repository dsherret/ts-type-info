import {StructureFactory} from "./../../../factories";
import {TypedStructure} from "./../../../structures";
import {TypedBinder} from "./../../base";

export class StructureTypedBinder extends TypedBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: TypedStructure) {
        super();
    }

    getType() {
        return this.factory.getTypeFromText(this.structure.type || "any");
    }
}
