import * as assert from "assert";
import {IBaseNamedDefinition} from "./../../../definitions";

export function runNamedDefinitionTests(definition: IBaseNamedDefinition, name: string) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    it(`should have a name ${name}`, () => {
        assert.equal(definition.name, name);
    });
}
