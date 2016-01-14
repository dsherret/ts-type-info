import * as assert from "assert";
import {DecoratorStructure} from "./../structures";
import {DecoratorDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runExpressionTests} from "./../expressions";

export function runDecoratorDefinitionTests(definition: DecoratorDefinition, structure: DecoratorStructure) {
    describe(`decorator ${structure.name}`, () => {
        structure.arguments = structure.arguments || [];

        runNamedDefinitionTests(definition, structure);

        it(`should have ${structure.arguments.length} argument(s)`, () => {
            assert.equal(definition.arguments.length, structure.arguments.length);
        });

        structure.arguments.forEach((argumentStructure, i) => {
            describe(`argument ${argumentStructure.text}`, () => {
                runExpressionTests(definition.arguments[i], argumentStructure);
            });
        });
    });
}
