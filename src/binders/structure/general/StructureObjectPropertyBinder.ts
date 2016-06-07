import {StructureFactory} from "./../../../factories";
import {ObjectPropertyStructure} from "./../../../structures";
import {ObjectPropertyBinder} from "./../../base";
import {StructureBaseObjectPropertyBinder} from "./../base/StructureBaseObjectPropertyBinder";

export class StructureObjectPropertyBinder extends ObjectPropertyBinder {
    constructor(factory: StructureFactory, structure: ObjectPropertyStructure) {
        super(new StructureBaseObjectPropertyBinder(factory, structure));
    }
}
