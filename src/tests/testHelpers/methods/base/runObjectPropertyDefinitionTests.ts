import {ObjectPropertyTestStructure} from "./../../testStructures";
import {ObjectPropertyDefinition} from "./../../../../definitions";
import {runBasePropertyDefinitionTests} from "./runBasePropertyDefinitionTests";
import {runDefaultExpressionedDefinitionTests} from "./runDefaultExpressionedDefinitionTests";

export function runObjectPropertyDefinitionTests(definition: ObjectPropertyDefinition, structure: ObjectPropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        runBasePropertyDefinitionTests(definition, structure);
        runDefaultExpressionedDefinitionTests(definition, structure);
    });
}
