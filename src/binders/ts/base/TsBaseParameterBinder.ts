import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseParameterBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";
import {TsDefaultExpressionedBinder} from "./TsDefaultExpressionedBinder";
import {TsOptionalBinderForParameter} from "./TsOptionalBinderForParameter";
import {TsNamedBinderByNode} from "./TsNamedBinderByNode";
import {TsNodedBinder} from "./TsNodedBinder";
import {TsTypedBinderByNode} from "./TsTypedBinderByNode";

export class TsBaseParameterBinder extends BaseParameterBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderByNode(node),
            new TsOptionalBinderForParameter(node),
            new TsTypedBinderByNode(factory, node),
            new TsDefaultExpressionedBinder(factory, node),
            new TsNodedBinder(factory, node)
        );
    }

    getIsRestParameter() {
        return this.node.isRestParameter();
    }

    getDestructuringProperties() {
        return this.node.getParameterObjectBindingPatternElements().map(e => this.factory.getObjectProperty(e));
    }
}
