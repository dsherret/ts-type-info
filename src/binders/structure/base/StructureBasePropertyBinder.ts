import {StructureFactory} from "./../../../factories";
import {BasePropertyStructure} from "./../../../structures";
import {BasePropertyBinder} from "./../../base";
import {StructureNamedBinder} from "./StructureNamedBinder";
import {StructureTypeExpressionedBinder} from "./StructureTypeExpressionedBinder";
import {StructureBaseDefinitionBinder} from "./StructureBaseDefinitionBinder";

export class StructureBasePropertyBinder extends BasePropertyBinder {
    constructor(private factory: StructureFactory, private structure: BasePropertyStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureTypeExpressionedBinder(factory, structure)
        );
    }

    getIsOptional() {
        return this.structure.isOptional || false;
    }
}
