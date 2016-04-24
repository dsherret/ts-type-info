import {BaseClassMethodParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../../definitions";
import {TsFactory} from "./../../../../factories";
import {TsNode} from "./../../../../compiler";
import {BaseClassMethodBinder} from "./../../../base";
import {TsDecoratableBinder, TsBaseFunctionBinder, TsParameterBinderByNodeConstructor, TsFunctionBodyWriteableBinder} from "./../../base";
import {TsScopedBinder} from "./TsScopedBinder";

export class TsBaseClassMethodBinder<ParameterType extends BaseClassMethodParameterDefinition> extends BaseClassMethodBinder<ParameterType> {
    constructor(
        factory: TsFactory,
        node: TsNode,
        paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super(
            new TsBaseFunctionBinder(factory, node, paramDefinition, paramBinder),
            new TsDecoratableBinder(factory, node),
            new TsScopedBinder(node),
            new TsFunctionBodyWriteableBinder()
        );
    }
}
