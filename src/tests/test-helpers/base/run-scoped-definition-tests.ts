import * as assert from "assert";
import {IScopedDefinition} from "./../../../definitions";
import {Scope} from "./../../../scope";

export function runScopedDefinitionTests(definition: IScopedDefinition, scope: Scope) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    it(`should have a scope ${Scope[scope]}`, () => {
        assert.equal(definition.scope, scope);
    });
}
