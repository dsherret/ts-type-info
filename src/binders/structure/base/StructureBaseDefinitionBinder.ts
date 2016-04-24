import {BaseStructure} from "./../../../structures";
import {BaseDefinitionBinder} from "./../../base";

export class StructureBaseDefinitionBinder extends BaseDefinitionBinder {
    constructor(private structure: BaseStructure) {
        super();
    }

    getOnBeforeWrite() {
        return this.structure.onBeforeWrite;
    }

    getOnAfterWrite() {
        return this.structure.onAfterWrite;
    }
}
