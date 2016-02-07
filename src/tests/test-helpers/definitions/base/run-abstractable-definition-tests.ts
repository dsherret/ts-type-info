import * as assert from "assert";
import {IAbstractableDefinition} from "./../../../../definitions";
import {AbstractableStructure} from "./../../structures";

export function runAbstractableDefinitionTests(definition: IAbstractableDefinition, structure: AbstractableStructure) {
    it(`should ${structure.isAbstract ? "be" : "not be"} abstractable`, () => {
        assert.equal(definition.isAbstract, structure.isAbstract || false);
    });
}
