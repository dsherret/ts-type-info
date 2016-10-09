import {BaseClassMethodParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../../definitions";
import {TsFactory} from "./../../../../factories";
import {TsNode} from "./../../../../compiler";
import {BaseClassMethodBinder} from "./../../../base";
import {TsDecoratableBinder, TsAsyncableBinder, TsBaseFunctionBinderByNodes, TsParameterBinderByNodeConstructor, TsFunctionBodyWriteableBinder} from "./../../base";
import {TsScopedBinder} from "./TsScopedBinder";

export class TsBaseClassMethodBinder<ParameterType extends BaseClassMethodParameterDefinition> extends BaseClassMethodBinder<ParameterType> {
    constructor(
        factory: TsFactory,
        nodes: TsNode[],
        paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super(
            new TsBaseFunctionBinderByNodes(factory, nodes, paramDefinition, paramBinder),
            new TsDecoratableBinder(factory, nodes[nodes.length - 1]),
            new TsScopedBinder(nodes[nodes.length - 1]),
            new TsAsyncableBinder(nodes[nodes.length - 1]),
            new TsFunctionBodyWriteableBinder()
        );
    }
}
