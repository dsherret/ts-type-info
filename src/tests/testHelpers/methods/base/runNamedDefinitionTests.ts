import * as assert from "assert";
import {NamedDefinition, OptionallyNamedDefinition} from "./../../../../definitions";
import {NamedTestStructure, OptionallyNamedTestStructure} from "./../../testStructures";

export function runNamedDefinitionTests(definition: NamedDefinition | OptionallyNamedDefinition, structure: NamedTestStructure | OptionallyNamedTestStructure) {
    it(`should have a name ${structure.name}`, () => {
        assert.equal(definition.name, structure.name);
    });
}
