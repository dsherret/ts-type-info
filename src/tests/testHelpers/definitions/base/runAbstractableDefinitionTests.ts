import * as assert from "assert";
import {IAbstractableDefinition} from "./../../../../definitions";
import {AbstractableTestStructure} from "./../../testStructures";

export function runAbstractableDefinitionTests(definition: IAbstractableDefinition, structure: AbstractableTestStructure) {
    it(`should ${structure.isAbstract ? "be" : "not be"} abstractable`, () => {
        assert.equal(definition.isAbstract, structure.isAbstract || false);
    });
}
