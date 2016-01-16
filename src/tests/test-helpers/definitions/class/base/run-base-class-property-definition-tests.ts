import {ClassPropertyStructure} from "./../../../structures";
import {BaseClassPropertyDefinition} from "./../../../../../definitions";
import {runBasePropertyDefinitionTests, runScopedDefinitionTests} from "./../../base";

export function runBaseClassPropertyDefinitionTests(definition: BaseClassPropertyDefinition, structure: ClassPropertyStructure) {
    runBasePropertyDefinitionTests(definition, structure);
    runScopedDefinitionTests(definition, structure);
}
