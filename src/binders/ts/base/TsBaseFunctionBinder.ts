import {BaseParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {TsNode} from "./../../../wrappers";
import {BaseFunctionBinder} from "./../../base";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypeParameteredBinderByNode} from "./TsTypeParameteredBinderByNode";
import {TsParameteredBinderByNode, TsParameterBinderByNodeConstructor} from "./TsParameteredBinderByNode";
import {TsReturnTypedBinderByNode} from "./TsReturnTypedBinderByNode";

export class TsBaseFunctionBinder<ParameterType extends BaseParameterDefinition<any>> extends BaseFunctionBinder<ParameterType> {
    constructor(
        private mainFactory: MainFactory,
        private node: TsNode,
        private paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        private paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super(
            new TsNamedBinder(node),
            new TsTypeParameteredBinderByNode(mainFactory, node),
            new TsParameteredBinderByNode(mainFactory, node, paramDefinition, paramBinder),
            new TsReturnTypedBinderByNode(mainFactory, node)
        );
    }
}
