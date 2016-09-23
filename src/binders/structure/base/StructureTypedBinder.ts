import {TypeNodeDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {TypedStructure} from "./../../../structures";
import {TypedBinder} from "./../../base";
import {StructureTypeBinder} from "./../expression";

export class StructureTypedBinder extends TypedBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: TypedStructure) {
        super();
    }

    getType() {
        const def = new TypeNodeDefinition();
        const binder = new StructureTypeBinder(this.factory, this.structure.type || "any");
        binder.bind(def);
        return def;
    }
}
