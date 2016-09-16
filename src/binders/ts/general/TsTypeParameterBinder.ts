import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeParameterBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base/TsBaseDefinitionBinder";
import {TsNamedBinder} from "./../base/TsNamedBinder";

export class TsTypeParameterBinder extends TypeParameterBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node)
        );
    }

    getConstraintType() {
        const constraintTypeNode = this.node.getTypeParameterConstraintTypeNode();
        return constraintTypeNode == null ? null : this.factory.getTypeFromTypeNode(constraintTypeNode);
    }
}
