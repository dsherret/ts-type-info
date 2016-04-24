import {TypeParameterStructure} from "./../../../structures";
import {StructureFactory} from "./../../../factories";
import {TypeParameterBinder} from "./../../base";
import {StructureBaseDefinitionBinder} from "./../base/StructureBaseDefinitionBinder";
import {StructureNamedBinder} from "./../base/StructureNamedBinder";

export class StructureTypeParameterBinder extends TypeParameterBinder {
    constructor(private factory: StructureFactory, private structure: TypeParameterStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure)
        );
    }

    getConstraintTypeExpression() {
        return this.factory.getTypeExpressionFromText(this.structure.constraintType);
    }
}
