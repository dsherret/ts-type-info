import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseParameterBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";
import {TsDefaultExpressionedBinder} from "./TsDefaultExpressionedBinder";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypedBinder} from "./TsTypedBinder";

export class TsBaseParameterBinder extends BaseParameterBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsTypedBinder(factory, node),
            new TsDefaultExpressionedBinder(factory, node)
        );
    }

    getIsOptional() {
        return this.node.isParameterOptional();
    }

    getIsRestParameter() {
        return this.node.isRestParameter();
    }

    getDestructuringProperties() {
        return this.node.getParameterObjectBindingPatternElements().map(e => this.factory.getObjectProperty(e));
    }
}
