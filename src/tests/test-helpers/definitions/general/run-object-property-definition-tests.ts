import * as assert from "assert";
import {ObjectPropertyStructure} from "./../../structures";
import {ObjectPropertyDefinition} from "./../../../../definitions";
import {runBasePropertyDefinitionTests} from "./../base";
import {runExpressionTests} from "./../../expressions";

export function runObjectPropertyDefinitionTests(definition: ObjectPropertyDefinition, structure: ObjectPropertyStructure) {
    describe(`property ${structure.name}`, () => {
        runBasePropertyDefinitionTests(definition, structure);

        if (structure.defaultExpression != null) {
            it(`should have the default expression`, () => {
                runExpressionTests(definition.defaultExpression, structure.defaultExpression);
            });
        }
        else {
            it(`should not have a default expression.`, () => {
                assert.equal(definition.defaultExpression, null);
            });
        }
    });
}
