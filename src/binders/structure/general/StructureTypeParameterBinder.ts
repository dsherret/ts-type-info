import {TypeParameterStructure} from "./../../../structures";
import {StructureFactory} from "./../../../factories";
import {TypeParameterBinder} from "./../../base";
import {StructureBaseDefinitionBinder} from "./../base/StructureBaseDefinitionBinder";
import {StructureNamedBinder} from "./../base/StructureNamedBinder";

export class StructureTypeParameterBinder extends TypeParameterBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: TypeParameterStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure)
        );
    }

    getConstraintType() {
        return this.structure.constraintType == null ? null : this.factory.getTypeFromText(this.structure.constraintType);
    }
}
