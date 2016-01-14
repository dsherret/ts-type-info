import * as assert from "assert";
import {IDecoratableDefinition} from "./../../../definitions";
import {runDecoratorDefinitionTests} from "./run-decorator-definition-tests";
import {Decoratable} from "./../structures";

export function runDecoratableDefinitionTests(definition: IDecoratableDefinition, structure: Decoratable) {
    describe("decorators", () => {
        structure.decorators = structure.decorators || [];

        it(`should have ${structure.decorators.length} parameters`, () => {
            assert.equal(definition.decorators.length, structure.decorators.length);
        });

        structure.decorators.forEach((decoratorStructure, i) => {
            runDecoratorDefinitionTests(definition.decorators[i], structure.decorators[i]);
        });
    });
}
