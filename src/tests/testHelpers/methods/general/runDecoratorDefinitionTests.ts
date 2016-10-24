import * as assert from "assert";
import {DecoratorTestStructure} from "./../../testStructures";
import {DecoratorDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runNamedDefinitionTests} from "./../base";
import {runExpressionDefinitionTests} from "./../expression";
import {ensureNotNull} from "./../../ensureNotNull";

export function runDecoratorDefinitionTests(definition: DecoratorDefinition, structure: DecoratorTestStructure) {
    describe(`decorator ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.arguments = structure.arguments || [];
            structure.isDecoratorFactory = structure.isDecoratorFactory || false;

            runBaseDefinitionTests(definition, structure);
            runNamedDefinitionTests(definition, structure);

            it(`should have ${structure.arguments.length} argument(s)`, () => {
                assert.equal(definition.arguments.length, structure.arguments!.length);
            });

            structure.arguments.forEach((argumentTestStructure, i) => {
                describe(`argument ${argumentTestStructure.text}`, () => {
                    runExpressionDefinitionTests(definition.arguments[i], argumentTestStructure);
                });
            });

            it(`should have the same ${nameof(structure.isDecoratorFactory)} property`, () => {
                assert.equal(definition.isDecoratorFactory, structure.isDecoratorFactory);
            });
        });
    });
}
