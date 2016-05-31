import {ClassPropertyTestStructure} from "./../../../testStructures";
import {BaseClassPropertyDefinition} from "./../../../../../definitions";
import {runBaseObjectPropertyDefinitionTests} from "./../../base";
import {runScopedDefinitionTests} from "./runScopedDefinitionTests";

export function runBaseClassPropertyDefinitionTests(definition: BaseClassPropertyDefinition, structure: ClassPropertyTestStructure) {
    runBaseObjectPropertyDefinitionTests(definition, structure);
    runScopedDefinitionTests(definition, structure);
}
