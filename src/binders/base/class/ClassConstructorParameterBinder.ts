import {ClassConstructorParameterDefinition, ClassConstructorParameterScope} from "./../../../definitions";
import {BaseParameterBinder, DecoratableBinder, ReadonlyableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class ClassConstructorParameterBinder implements IBaseBinder {
    constructor(
        private readonly baseParameterBinder: BaseParameterBinder,
        private readonly decoratableBinder: DecoratableBinder,
        private readonly readonlyableBinder: ReadonlyableBinder
    ) {
    }

    abstract getClassConstructorParameterScope(): ClassConstructorParameterScope;

    bind(def: ClassConstructorParameterDefinition) {
        this.baseParameterBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.readonlyableBinder.bind(def);
        def.scope = this.getClassConstructorParameterScope();

        if (def.isReadonly && def.scope === ClassConstructorParameterScope.None) {
            def.scope = ClassConstructorParameterScope.Public;
        }
    }
}
