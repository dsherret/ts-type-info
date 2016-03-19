import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeParameterBinder} from "./../../base";
import {TsNamedBinder} from "./../base/TsNamedBinder";

export class TsTypeParameterBinder extends TypeParameterBinder {
    constructor(private tsFactory: TsFactory, private node: TsNode) {
        super(new TsNamedBinder(node));
    }

    getConstraintTypeExpression() {
        return this.tsFactory.getTypeExpression(this.node.getTypeParameterConstraintTypeExpression());
    }
}
