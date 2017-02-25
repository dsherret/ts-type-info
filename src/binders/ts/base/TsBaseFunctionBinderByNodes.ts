import {BaseParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseFunctionBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";
import {TsNamedBinderByNode} from "./TsNamedBinderByNode";
import {TsTypeParameteredBinderByNode} from "./TsTypeParameteredBinderByNode";
import {TsParameteredBinderByNode, TsParameterBinderByNodeConstructor} from "./TsParameteredBinderByNode";
import {TsReturnTypedBinderByNode} from "./TsReturnTypedBinderByNode";
import {TsNodedBinder} from "./TsNodedBinder";
import {TsOverloadSignaturedBinder} from "./TsOverloadSignaturedBinder";
import {TsDocumentationedBinder} from "./TsDocumentationedBinder";
import {TsUserDefinedTypeGuardedBinder} from "./TsUserDefinedTypeGuardedBinder";

export class TsBaseFunctionBinderByNodes<ParameterType extends BaseParameterDefinition> extends BaseFunctionBinder<ParameterType> {
    private readonly node: TsNode;
    private readonly factory: TsFactory;

    constructor(
        factory: TsFactory,
        nodes: TsNode[],
        paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        // use the first node for ambient declarations (where there is no implementation signature)
        let node: TsNode;
        if (nodes.length > 1 && nodes[0].isAmbient())
            node = nodes[0];
        else
            node = nodes[nodes.length - 1];

        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderByNode(node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsParameteredBinderByNode(factory, node, paramDefinition, paramBinder),
            new TsReturnTypedBinderByNode(factory, node),
            new TsNodedBinder(factory, node),
            new TsOverloadSignaturedBinder(factory, nodes),
            new TsDocumentationedBinder(node),
            new TsUserDefinedTypeGuardedBinder(factory, node)
        );

        this.factory = factory;
        this.node = node;
    }

    protected getIsGenerator() {
        return this.node.isGeneratorFunction();
    }
}
