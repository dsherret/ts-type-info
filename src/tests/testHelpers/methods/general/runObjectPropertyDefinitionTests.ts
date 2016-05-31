import {BaseObjectPropertyTestStructure} from "./../../testStructures";
import {BaseObjectPropertyDefinition} from "./../../../../definitions";
import {runBaseObjectPropertyDefinitionTests} from "./../base/runBaseObjectPropertyDefinitionTests";

export function runObjectPropertyDefinitionTests(definition: BaseObjectPropertyDefinition, structure: BaseObjectPropertyTestStructure) {
    runBaseObjectPropertyDefinitionTests(definition, structure);
}
