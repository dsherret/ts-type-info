import {ClassPropertyStructure} from "./../../../structures";
import {BaseClassPropertyDefinition} from "./../../../../../definitions";
import {runObjectPropertyDefinitionTests} from "./../../base";
import {runScopedDefinitionTests} from "./run-scoped-definition-tests";

export function runBaseClassPropertyDefinitionTests(definition: BaseClassPropertyDefinition, structure: ClassPropertyStructure) {
    runObjectPropertyDefinitionTests(definition, structure);
    runScopedDefinitionTests(definition, structure);
}
