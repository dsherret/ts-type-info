import * as assert from "assert";
import {IBaseNamedDefinition} from "./../../../../definitions";
import {NamedTestStructure} from "./../../testStructures";

export function runNamedDefinitionTests(definition: IBaseNamedDefinition, structure: NamedTestStructure) {
    it(`should have a name ${structure.name}`, () => {
        assert.equal(definition.name, structure.name);
    });
}
