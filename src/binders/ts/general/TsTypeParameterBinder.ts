import {TsNode} from "./../../../compiler";
import {MainFactory} from "./../../../factories";
import {TypeParameterBinder} from "./../../base";
import {TsNamedBinder} from "./../base/TsNamedBinder";

export class TsTypeParameterBinder extends TypeParameterBinder {
    constructor(private mainFactory: MainFactory, private node: TsNode) {
        super(new TsNamedBinder(node));
    }

    getConstraintTypeExpression() {
        return this.mainFactory.getTypeExpression(this.node.getTypeParameterConstraintTypeExpression());
    }
}
