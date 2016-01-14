import * as assert from "assert";
import {IScopedDefinition} from "./../../../definitions";
import {Scope} from "./../../../scope";
import {Scoped} from "./../structures";

export function runScopedDefinitionTests(definition: IScopedDefinition, structure: Scoped) {
    structure.scope = typeof structure.scope === "number" ? structure.scope : Scope.public;

    it(`should have a scope ${Scope[structure.scope]}`, () => {
        assert.equal(definition.scope, structure.scope);
    });
}
