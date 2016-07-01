import {StructureFactory} from "./../../../factories";
import {BaseParameterStructure} from "./../../../structures";
import {BaseParameterBinder} from "./../../base";
import {StructureBaseDefinitionBinder} from "./StructureBaseDefinitionBinder";
import {StructureDefaultExpressionedBinder} from "./StructureDefaultExpressionedBinder";
import {StructureNamedBinder} from "./StructureNamedBinder";
import {StructureOptionalBinder} from "./StructureOptionalBinder";
import {StructureTypedBinder} from "./StructureTypedBinder";

export class StructureBaseParameterBinder extends BaseParameterBinder {
    constructor(private factory: StructureFactory, private structure: BaseParameterStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureOptionalBinder(structure),
            new StructureTypedBinder(factory, structure),
            new StructureDefaultExpressionedBinder(structure)
        );
    }

    getIsRestParameter() {
        return this.structure.isRestParameter || false;
    }

    getDestructuringProperties() {
        return (this.structure.destructuringProperties || []).map(p => this.factory.getObjectProperty(p));
    }
}
