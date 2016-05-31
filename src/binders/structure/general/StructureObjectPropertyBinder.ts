import {ObjectPropertyStructure} from "./../../../structures";
import {ObjectPropertyBinder} from "./../../base";
import {StructureBaseObjectPropertyBinder} from "./../base/StructureBaseObjectPropertyBinder";

export class StructureObjectPropertyBinder extends ObjectPropertyBinder {
    constructor(structure: ObjectPropertyStructure) {
        super(new StructureBaseObjectPropertyBinder(structure));
    }
}
