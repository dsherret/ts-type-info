import {ParameteredDefinition, BaseParameterDefinition} from "./../../../definitions";
import {TypeExpression} from "./../../../expressions";

export abstract class ParameteredBinder<ParameterType extends BaseParameterDefinition<any>> {
    constructor() {
    }

    abstract getParameters(): ParameterType[];

    bind(def: ParameteredDefinition<ParameterType>) {
        def.parameters.push(...this.getParameters());
        def.parameters.forEach(p => p.parent = def);
    }
}
