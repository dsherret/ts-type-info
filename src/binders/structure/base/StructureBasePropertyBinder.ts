import {BasePropertyStructure} from "./../../../structures";
import {BasePropertyBinder} from "./../../base";
import {StructureNamedBinder} from "./StructureNamedBinder";
import {StructureTypeExpressionedBinder} from "./StructureTypeExpressionedBinder";

export class StructureBasePropertyBinder extends BasePropertyBinder {
    constructor(private structure: BasePropertyStructure) {
        super(
            new StructureNamedBinder(structure),
            new StructureTypeExpressionedBinder(structure)
        );
    }

    getIsOptional() {
        return this.structure.isOptional || false;
    }
}
