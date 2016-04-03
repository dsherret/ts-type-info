import {ReturnTypedStructure} from "./../../../structures";
import {StructureFactory} from "./../../../factories";
import {ReturnTypedBinder} from "./../../base";

export class StructureReturnTypedBinder extends ReturnTypedBinder {
    constructor(private factory: StructureFactory, private structure: ReturnTypedStructure) {
        super();
    }

    getReturnTypeExpression() {
        return this.factory.getTypeExpressionFromText(this.structure.returnType) || this.factory.getTypeExpressionFromText("void");
    }
}
