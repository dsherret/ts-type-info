import {TsNode, TsTypeNode} from "./../../../compiler";
import {BaseParameterDefinitionConstructor, BaseParameterDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {ParameteredBinder} from "./../../base";

export interface TsParameterBinderByTypeNodeConstructor<ParameterType extends BaseParameterDefinition> {
    new(factory: TsFactory, node: TsNode): { bind(def: ParameterType): void; };
}

export class TsParameteredBinderByTypeNode<ParameterType extends BaseParameterDefinition> extends ParameteredBinder<ParameterType> {
    constructor(
        private readonly factory: TsFactory,
        private readonly typeNode: TsTypeNode,
        private readonly paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        private readonly paramBinder: TsParameterBinderByTypeNodeConstructor<ParameterType>
    ) {
        super();
    }

    getParameters() {
        return this.typeNode.getParameters().map(param => {
            const paramDefinition = new this.paramDefinition();
            const paramBinder = new this.paramBinder(this.factory, param);

            paramBinder.bind(paramDefinition);

            return paramDefinition;
        });
    }
}
