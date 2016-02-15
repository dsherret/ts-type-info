import {ObjectPropertyTestStructure} from "./../../test-structures";
import {ObjectPropertyDefinition} from "./../../../../definitions";
import {runBasePropertyDefinitionTests} from "./run-base-property-definition-tests";
import {runDefaultExpressionedDefinitionTests} from "./run-default-expressioned-definition-tests";

export function runObjectPropertyDefinitionTests(definition: ObjectPropertyDefinition<any>, structure: ObjectPropertyTestStructure) {
    describe(`property ${structure.name}`, () => {
        runBasePropertyDefinitionTests(definition, structure);
        runDefaultExpressionedDefinitionTests(definition, structure);
    });
}
