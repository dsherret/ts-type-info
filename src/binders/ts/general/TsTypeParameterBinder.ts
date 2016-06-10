import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeParameterBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base/TsBaseDefinitionBinder";
import {TsNamedBinder} from "./../base/TsNamedBinder";

export class TsTypeParameterBinder extends TypeParameterBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node)
        );
    }

    getConstraintTypeExpression() {
        return this.factory.getType(this.node.getTypeParameterConstraintTypeExpression());
    }
}
