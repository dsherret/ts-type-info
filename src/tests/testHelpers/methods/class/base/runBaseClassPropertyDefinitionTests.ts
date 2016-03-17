import {ClassPropertyTestStructure} from "./../../../testStructures";
import {BaseClassPropertyDefinition} from "./../../../../../definitions";
import {runObjectPropertyDefinitionTests} from "./../../base";
import {runScopedDefinitionTests} from "./runScopedDefinitionTests";

export function runBaseClassPropertyDefinitionTests(definition: BaseClassPropertyDefinition, structure: ClassPropertyTestStructure) {
    runObjectPropertyDefinitionTests(definition, structure);
    runScopedDefinitionTests(definition, structure);
}
