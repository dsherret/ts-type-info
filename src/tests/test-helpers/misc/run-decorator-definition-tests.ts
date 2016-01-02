import * as assert from "assert";
import {Decorator} from "./../structures";
import {DecoratorDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../base";

export function runDecoratorDefinitionTests(definition: DecoratorDefinition, decorator: Decorator) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`decorator ${decorator.name}`, () => {
        runNamedDefinitionTests(definition, decorator.name);

        definition.arguments.forEach((argument, i) => {
            it(`should have a name of ${decorator.arguments[i].text}`, () => {
                assert.equal(argument.text, decorator.arguments[i].text);
            });
        });
    });
}
