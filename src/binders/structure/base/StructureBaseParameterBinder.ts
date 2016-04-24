import {BaseParameterStructure} from "./../../../structures";
import {BaseParameterBinder} from "./../../base";
import {StructureBaseDefinitionBinder} from "./StructureBaseDefinitionBinder";
import {StructureDefaultExpressionedBinder} from "./StructureDefaultExpressionedBinder";
import {StructureNamedBinder} from "./StructureNamedBinder";
import {StructureTypeExpressionedBinder} from "./StructureTypeExpressionedBinder";

export class StructureBaseParameterBinder extends BaseParameterBinder {
    constructor(private structure: BaseParameterStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureTypeExpressionedBinder(structure),
            new StructureDefaultExpressionedBinder(structure)
        );
    }

    getIsOptional() {
        return this.structure.isOptional || false;
    }

    getIsRestParameter() {
        return this.structure.isRestParameter || false;
    }
}
