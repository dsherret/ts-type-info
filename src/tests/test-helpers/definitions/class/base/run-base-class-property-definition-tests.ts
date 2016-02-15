import {ClassPropertyTestStructure} from "./../../../test-structures";
import {BaseClassPropertyDefinition} from "./../../../../../definitions";
import {runObjectPropertyDefinitionTests} from "./../../base";
import {runScopedDefinitionTests} from "./run-scoped-definition-tests";

export function runBaseClassPropertyDefinitionTests(definition: BaseClassPropertyDefinition, structure: ClassPropertyTestStructure) {
    runObjectPropertyDefinitionTests(definition, structure);
    runScopedDefinitionTests(definition, structure);
}
