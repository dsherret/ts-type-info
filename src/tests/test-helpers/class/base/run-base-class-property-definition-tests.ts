import {ClassProperty} from "./../../structures";
import {BaseClassPropertyDefinition} from "./../../../../definitions/class/base/base-class-property-definition";
import {runBasePropertyDefinitionTests} from "./../../base/run-base-property-definition-tests";
import {runScopedDefinitionTests} from "./../../base/run-scoped-definition-tests";

export function runBaseClassPropertyDefinitionTests(definition: BaseClassPropertyDefinition, property: ClassProperty) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    runBasePropertyDefinitionTests(definition, property);
    runScopedDefinitionTests(definition, property.scope);
}
