import {ScopedStructure} from "./../../../../structures";
import {Scope} from "./../../../../definitions";
import {ScopedBinder} from "./../../../base";

export class StructureScopedBinder extends ScopedBinder {
    constructor(private structure: ScopedStructure) {
        super();
    }

    getScope() {
        return this.structure.scope || Scope.Public;
    }
}
