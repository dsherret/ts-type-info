import * as assert from "assert";
import {IAmbientableDefinition} from "./../../../../definitions";
import {AmbientableStructure} from "./../../structures";

export function runAmbientableDefinitionTests(definition: IAmbientableDefinition, structure: AmbientableStructure) {
    it(`should ${structure.isAmbient ? "be" : "not be"} ambient`, () => {
        assert.equal(definition.isAmbient, structure.isAmbient || false);
    });
}
