import {BaseParameterDefinition, BaseParameterDefinitionConstructor, UserDefinedTypeGuardDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseFunctionBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypeParameteredBinderByNode} from "./TsTypeParameteredBinderByNode";
import {TsParameteredBinderByNode, TsParameterBinderByNodeConstructor} from "./TsParameteredBinderByNode";
import {TsReturnTypedBinderByNode} from "./TsReturnTypedBinderByNode";
import {TsNodedBinder} from "./TsNodedBinder";

export class TsBaseFunctionBinderByNodes<ParameterType extends BaseParameterDefinition> extends BaseFunctionBinder<ParameterType> {
    private readonly node: TsNode;

    constructor(
        private readonly factory: TsFactory,
        private readonly nodes: TsNode[],
        paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(nodes[nodes.length - 1]),
            new TsTypeParameteredBinderByNode(factory, nodes[nodes.length - 1]),
            new TsParameteredBinderByNode(factory, nodes[nodes.length - 1], paramDefinition, paramBinder),
            new TsReturnTypedBinderByNode(factory, nodes[nodes.length - 1]),
            new TsNodedBinder(factory, nodes[nodes.length - 1])
        );

        this.node = nodes[nodes.length - 1];
    }

    protected getIsGenerator() {
        return this.node.isGeneratorFunction();
    }

    protected getOverloadSignatures() {
        const overloadNodes = this.nodes.slice(0, this.nodes.length - 1);

        return overloadNodes.map(n => this.factory.getCallSignatureFromNode(n));
    }

    protected getUserDefinedTypeGuard() {
        let userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null = null;

        for (let node of this.node.getChildren()) {
            if (node.isUserDefinedTypeGuard()) {
                userDefinedTypeGuard = this.factory.getUserDefinedTypeGuardFromNode(node);
                break;
            }
        }

        return userDefinedTypeGuard;
    }
}
