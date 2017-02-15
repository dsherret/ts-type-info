import {UserDefinedTypeGuardStructure} from "./../../../structures";
import {StructureFactory} from "./../../../factories";
import {UserDefinedTypeGuardBinder} from "./../../base";
import {StructureNodedBinder} from "./../base/StructureNodedBinder";
import {StructureBaseDefinitionBinder} from "./../base/StructureBaseDefinitionBinder";

export class StructureUserDefinedTypeGuardBinder extends UserDefinedTypeGuardBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: UserDefinedTypeGuardStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNodedBinder()
        );
    }

    getParameterName() {
        return this.structure.parameterName || "this";
    }

    getType() {
        return this.factory.getTypeFromText(this.structure.type);
    }
}
