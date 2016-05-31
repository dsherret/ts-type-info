import {BaseObjectPropertyStructure} from "./../../../structures";
import {BaseObjectPropertyBinder} from "./../../base";
import {StructureBasePropertyBinder} from "./StructureBasePropertyBinder";
import {StructureDefaultExpressionedBinder} from "./StructureDefaultExpressionedBinder";

export class StructureBaseObjectPropertyBinder extends BaseObjectPropertyBinder {
    constructor(structure: BaseObjectPropertyStructure) {
        super(
            new StructureBasePropertyBinder(structure),
            new StructureDefaultExpressionedBinder(structure)
        );
    }
}
