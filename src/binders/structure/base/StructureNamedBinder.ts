import {NamedStructure} from "./../../../structures";
import {NamedBinder} from "./../../base";

export class StructureNamedBinder extends NamedBinder {
    constructor(private structure: NamedStructure) {
        super();
    }

    getName() {
        return this.structure.name;
    }
}