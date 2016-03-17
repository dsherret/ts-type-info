import {BaseClassMethodParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../../definitions";
import {MainFactory} from "./../../../../factories";
import {TsNode} from "./../../../../compiler";
import {BaseClassMethodBinder} from "./../../../base";
import {TsDecoratableBinder, TsBaseFunctionBinder, TsParameterBinderByNodeConstructor} from "./../../base";
import {TsScopedBinder} from "./TsScopedBinder";

export class TsBaseClassMethodBinder<ParameterType extends BaseClassMethodParameterDefinition<any>> extends BaseClassMethodBinder<ParameterType> {
    constructor(
        mainFactory: MainFactory,
        node: TsNode,
        paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super(
            new TsBaseFunctionBinder(mainFactory, node, paramDefinition, paramBinder),
            new TsDecoratableBinder(node),
            new TsScopedBinder(node)
        );
    }
}
