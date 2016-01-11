import {Scope} from "./../../../../scope";
import {ClassProperty} from "./../../structures";
import {BaseClassPropertyDefinition} from "./../../../../definitions/class/base/base-class-property-definition";
import {runPropertyDefinitionTests} from "./../../base/run-property-definition-tests";
import {runScopedDefinitionTests} from "./../../base/run-scoped-definition-tests";

export function runBaseClassPropertyDefinitionTests(definition: BaseClassPropertyDefinition, property: ClassProperty) {
    runPropertyDefinitionTests(definition, property);
    runScopedDefinitionTests(definition, typeof property.scope === "number" ? property.scope : Scope.public);
}
