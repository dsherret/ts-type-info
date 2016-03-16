import {ClassConstructorParameterDefinition, ClassConstructorParameterScope} from "./../../../definitions";
import {BaseParameterBinder, DecoratableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ClassConstructorParameterBinder implements IBaseBinder {
    constructor(
        private baseParameterBinder: BaseParameterBinder,
        private decoratableBinder: DecoratableBinder
    ) {
    }

    abstract getClassConstructorParameterScope(): ClassConstructorParameterScope;

    bind(def: ClassConstructorParameterDefinition) {
        this.baseParameterBinder.bind(def);
        this.decoratableBinder.bind(def);
        def.scope = this.getClassConstructorParameterScope();
    }
}
