import {NamedStructure, OptionallyNamedStructure} from "./../../../structures";
import {NamedBinder} from "./../../base";

export class StructureNamedBinder extends NamedBinder {
    constructor(private structure: NamedStructure | OptionallyNamedStructure) {
        super();
    }

    getName() {
        return this.structure.name || null;
    }
}
