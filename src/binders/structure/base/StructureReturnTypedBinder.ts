import {ReturnTypedStructure} from "./../../../structures";
import {StructureFactory} from "./../../../factories";
import {ReturnTypedBinder} from "./../../base";

export class StructureReturnTypedBinder extends ReturnTypedBinder {
    constructor(private factory: StructureFactory, private structure: ReturnTypedStructure) {
        super();
    }

    getReturnType() {
        return this.factory.getTypeFromText(this.structure.returnType) || this.factory.getTypeFromText("void");
    }
}
