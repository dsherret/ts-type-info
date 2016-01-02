import * as assert from "assert";
import {IDecoratableDefinition} from "./../../../definitions";
import {runDecoratorDefinitionTests} from "./../misc";
import {Decorator} from "./../structures";

export function runDecoratableDefinitionTests(definition: IDecoratableDefinition, decorators: Decorator[]) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    it(`should have ${decorators.length} parameters`, () => {
        assert.equal(definition.decorators.length, decorators.length);
    });

    definition.decorators.forEach((decorator, i) => {
        runDecoratorDefinitionTests(decorator, decorators[i]);
    });
}
