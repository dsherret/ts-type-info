import {TsNode, TsType} from "./../../../compiler";
import {BaseParameterDefinitionConstructor, BaseParameterDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {ParameteredBinder} from "./../../base";

export interface TsParameterBinderByTypeConstructor<ParameterType extends BaseParameterDefinition> {
    new(factory: TsFactory, node: TsNode): { bind(def: ParameterType): void; };
}

// todo: remove this class. This was only temporary for refactoring!
export class TsParameteredBinderByType<ParameterType extends BaseParameterDefinition> extends ParameteredBinder<ParameterType> {
    constructor(
        private readonly factory: TsFactory,
        private readonly type: TsType,
        private readonly paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        private readonly paramBinder: TsParameterBinderByTypeConstructor<ParameterType>
    ) {
        super();
    }

    getParameters() {
        return [] as ParameterType[];
    }
}
