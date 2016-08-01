import {BaseStructure} from "./../../../structures";
import {BaseDefinitionBinder} from "./../../base";

export class StructureBaseDefinitionBinder extends BaseDefinitionBinder {
    constructor(private readonly structure: BaseStructure) {
        super();
    }

    getOnBeforeWrite() {
        return this.structure.onBeforeWrite || null;
    }

    getOnAfterWrite() {
        return this.structure.onAfterWrite || null;
    }
}
