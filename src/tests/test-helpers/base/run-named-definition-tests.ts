import * as assert from "assert";
import {IBaseNamedDefinition} from "./../../../definitions";
import {Named} from "./../structures";

export function runNamedDefinitionTests(definition: IBaseNamedDefinition, structure: Named) {
    it(`should have a name ${structure.name}`, () => {
        assert.equal(definition.name, structure.name);
    });
}
