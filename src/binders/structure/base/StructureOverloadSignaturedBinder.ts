import {StructureFactory} from "./../../../factories";
import {OverloadSignaturedStructure} from "./../../../structures";
import {OverloadSignaturedBinder} from "./../../base";

export class StructureOverloadSignaturedBinder extends OverloadSignaturedBinder {
    constructor(
        private readonly factory: StructureFactory,
        private readonly structure: OverloadSignaturedStructure
    ) {
        super();
    }

    protected getOverloadSignatures() {
        return (this.structure.overloadSignatures || []).map(s => this.factory.getCallSignature(s));
    }
}
