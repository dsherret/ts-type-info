import {ClassProperty} from "./../../structures";
import {BaseClassPropertyDefinition} from "./../../../../definitions/class/base/base-class-property-definition";
import {runPropertyDefinitionTests} from "./../../base/run-property-definition-tests";
import {runScopedDefinitionTests} from "./../../base/run-scoped-definition-tests";

export function runBaseClassPropertyDefinitionTests(definition: BaseClassPropertyDefinition, structure: ClassProperty) {
    runPropertyDefinitionTests(definition, structure);
    runScopedDefinitionTests(definition, structure);
}
