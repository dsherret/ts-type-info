import {ClassConstructorDefinition, ClassConstructorParameterDefinition} from "./../../../definitions";
import {BaseDefinitionBinder, ParameteredBinder, FunctionBodyWriteableBinder, NodedBinder, OverloadSignaturedBinder, DocumentationedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";
import {ScopedBinder} from "./base";

export abstract class ClassConstructorBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly parameteredBinder: ParameteredBinder<ClassConstructorParameterDefinition>,
        private readonly functionBodyWriteableBinder: FunctionBodyWriteableBinder,
        private readonly scopedBinder: ScopedBinder,
        private readonly nodedBinder: NodedBinder,
        private readonly overloadSignaturedBinder: OverloadSignaturedBinder,
        private readonly documentationedBinder: DocumentationedBinder
    ) {
    }

    bind(def: ClassConstructorDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.parameteredBinder.bind(def);
        this.functionBodyWriteableBinder.bind(def);
        this.scopedBinder.bind(def);
        this.nodedBinder.bind(def);
        this.overloadSignaturedBinder.bind(def);
        this.documentationedBinder.bind(def);
    }
}
