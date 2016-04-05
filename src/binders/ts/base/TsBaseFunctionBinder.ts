import {BaseParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseFunctionBinder} from "./../../base";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypeParameteredBinderByNode} from "./TsTypeParameteredBinderByNode";
import {TsParameteredBinderByNode, TsParameterBinderByNodeConstructor} from "./TsParameteredBinderByNode";
import {TsReturnTypedBinderByNode} from "./TsReturnTypedBinderByNode";

export class TsBaseFunctionBinder<ParameterType extends BaseParameterDefinition> extends BaseFunctionBinder<ParameterType> {
    constructor(
        factory: TsFactory,
        node: TsNode,
        paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super(
            new TsNamedBinder(node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsParameteredBinderByNode(factory, node, paramDefinition, paramBinder),
            new TsReturnTypedBinderByNode(factory, node)
        );
    }
}
