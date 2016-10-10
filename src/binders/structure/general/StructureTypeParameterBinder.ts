import {TypeParameterStructure} from "./../../../structures";
import {StructureFactory} from "./../../../factories";
import {TypeParameterBinder} from "./../../base";
import {StructureBaseDefinitionBinder} from "./../base/StructureBaseDefinitionBinder";
import {StructureNamedBinder} from "./../base/StructureNamedBinder";
import {StructureNodedBinder} from "./../base/StructureNodedBinder";

export class StructureTypeParameterBinder extends TypeParameterBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: TypeParameterStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureNodedBinder()
        );
    }

    getConstraintType() {
        return this.structure.constraintType == null ? null : this.factory.getTypeFromText(this.structure.constraintType);
    }
}
