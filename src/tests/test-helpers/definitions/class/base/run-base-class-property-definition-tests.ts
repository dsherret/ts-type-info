import {ClassPropertyStructure} from "./../../../structures";
import {BaseClassPropertyDefinition} from "./../../../../../definitions";
import {runObjectPropertyDefinitionTests, runScopedDefinitionTests} from "./../../base";

export function runBaseClassPropertyDefinitionTests(definition: BaseClassPropertyDefinition, structure: ClassPropertyStructure) {
    runObjectPropertyDefinitionTests(definition, structure);
    runScopedDefinitionTests(definition, structure);
}
