import {ObjectPropertyStructure} from "./../../../structures";
import {ObjectPropertyBinder} from "./../../base";
import {StructureBasePropertyBinder} from "./StructureBasePropertyBinder";
import {StructureDefaultExpressionedBinder} from "./StructureDefaultExpressionedBinder";

export class StructureObjectPropertyBinder extends ObjectPropertyBinder {
    constructor(structure: ObjectPropertyStructure) {
        super(
            new StructureBasePropertyBinder(structure),
            new StructureDefaultExpressionedBinder(structure)
        );
    }
}
