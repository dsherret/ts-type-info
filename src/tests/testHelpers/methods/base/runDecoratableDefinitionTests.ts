import * as assert from "assert";
import {DecoratedDefinitions} from "./../../../../definitions";
import {runDecoratorDefinitionTests} from "./../general";
import {DecoratableTestStructure} from "./../../testStructures";

export function runDecoratableDefinitionTests(definition: DecoratedDefinitions, structure: DecoratableTestStructure) {
    describe("decorators", () => {
        structure.decorators = structure.decorators || [];

        it(`should have ${structure.decorators.length} parameters`, () => {
            assert.equal(definition.decorators.length, structure.decorators!.length);
        });

        structure.decorators.forEach((decoratorTestStructure, i) => {
            runDecoratorDefinitionTests(definition.decorators[i], decoratorTestStructure);
        });
    });
}
