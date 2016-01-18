import {ObjectPropertyStructure} from "./../../structures";
import {ObjectPropertyDefinition} from "./../../../../definitions";
import {runBasePropertyDefinitionTests, runDefaultExpressionedDefinitionTests} from "./../base";

export function runObjectPropertyDefinitionTests(definition: ObjectPropertyDefinition, structure: ObjectPropertyStructure) {
    describe(`property ${structure.name}`, () => {
        runBasePropertyDefinitionTests(definition, structure);
        runDefaultExpressionedDefinitionTests(definition, structure);
    });
}
