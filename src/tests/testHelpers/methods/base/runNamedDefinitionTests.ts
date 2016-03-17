import * as assert from "assert";
import {NamedDefinition} from "./../../../../definitions";
import {NamedTestStructure} from "./../../testStructures";

export function runNamedDefinitionTests(definition: NamedDefinition, structure: NamedTestStructure) {
    it(`should have a name ${structure.name}`, () => {
        assert.equal(definition.name, structure.name);
    });
}
