import {ParameteredDefinition, BaseParameterDefinition, TypeExpressionDefinition} from "./../../../definitions";

export abstract class ParameteredBinder<ParameterType extends BaseParameterDefinition<any>> {
    abstract getParameters(): ParameterType[];

    bind(def: ParameteredDefinition<ParameterType>) {
        def.parameters.push(...this.getParameters());
        def.parameters.forEach(p => p.parent = def);
    }
}
