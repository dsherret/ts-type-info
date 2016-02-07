import * as assert from "assert";
import {DecoratorStructure} from "./../../structures";
import {DecoratorDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runParentedDefinitionTests} from "./../base";
import {runExpressionTests} from "./../../expressions";
import {ensureNotNull} from "./../../ensure-not-null";

export function runDecoratorDefinitionTests(definition: DecoratorDefinition<any>, structure: DecoratorStructure) {
    describe(`decorator ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.arguments = structure.arguments || [];

            runNamedDefinitionTests(definition, structure);
            runParentedDefinitionTests(definition);

            it(`should have ${structure.arguments.length} argument(s)`, () => {
                assert.equal(definition.arguments.length, structure.arguments.length);
            });

            structure.arguments.forEach((argumentStructure, i) => {
                describe(`argument ${argumentStructure.text}`, () => {
                    runExpressionTests(definition.arguments[i], argumentStructure);
                });
            });
        });
    });
}
