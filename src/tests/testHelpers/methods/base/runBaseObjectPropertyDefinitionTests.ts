import {BaseObjectPropertyTestStructure} from "./../../testStructures";
import {BaseObjectPropertyDefinition} from "./../../../../definitions";
import {runBasePropertyDefinitionTests} from "./runBasePropertyDefinitionTests";
import {runDefaultExpressionedDefinitionTests} from "./runDefaultExpressionedDefinitionTests";
import {runReadonlyableDefinitionTests} from "./runReadonlyableDefinitionTests";

export function runBaseObjectPropertyDefinitionTests(definition: BaseObjectPropertyDefinition, structure: BaseObjectPropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        runBasePropertyDefinitionTests(definition, structure);
        runDefaultExpressionedDefinitionTests(definition, structure);
        runReadonlyableDefinitionTests(definition, structure);
    });
}
