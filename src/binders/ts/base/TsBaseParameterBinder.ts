import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseParameterBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";
import {TsDefaultExpressionedBinder} from "./TsDefaultExpressionedBinder";
import {TsOptionalBinderForParameter} from "./TsOptionalBinderForParameter";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypedBinder} from "./TsTypedBinder";

export class TsBaseParameterBinder extends BaseParameterBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsOptionalBinderForParameter(node),
            new TsTypedBinder(factory, node),
            new TsDefaultExpressionedBinder(factory, node)
        );
    }

    getIsRestParameter() {
        return this.node.isRestParameter();
    }

    getDestructuringProperties() {
        return this.node.getParameterObjectBindingPatternElements().map(e => this.factory.getObjectProperty(e));
    }
}
