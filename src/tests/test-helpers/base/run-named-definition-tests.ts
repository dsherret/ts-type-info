import * as assert from "assert";
import {INamedDefinition} from "./../../../definitions/base/named-definition";

export function runNamedDefinitionTests(definition: INamedDefinition, name: string) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    it(`should have a name ${name}`, () => {
        assert.equal(definition.name, name);
    });
}
