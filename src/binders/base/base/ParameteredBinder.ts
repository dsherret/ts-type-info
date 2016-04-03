import {ParameteredDefinition, BaseParameterDefinition} from "./../../../definitions";

export abstract class ParameteredBinder<ParameterType extends BaseParameterDefinition> {
    abstract getParameters(): ParameterType[];

    bind(def: ParameteredDefinition<ParameterType>) {
        def.parameters.push(...this.getParameters());
    }
}
