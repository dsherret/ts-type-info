import {UserDefinedTypeGuardDefinition} from "./../../../definitions";
import {UserDefinedTypeGuardedStructure} from "./../../../structures";
import {StructureFactory} from "./../../../factories";
import {UserDefinedTypeGuardedBinder} from "./../../base";

export class StructureUserDefinedTypeGuardedBinder extends UserDefinedTypeGuardedBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: UserDefinedTypeGuardedStructure) {
        super();
    }

    protected getUserDefinedTypeGuard(): UserDefinedTypeGuardDefinition | null {
        if (this.structure.userDefinedTypeGuard == null)
            return null;

        return this.factory.getUserDefinedTypeGuard(this.structure.userDefinedTypeGuard);
    }
}
