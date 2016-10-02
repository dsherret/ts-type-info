import * as assert from "assert";
import {NamedDefinition, NodedDefinition} from "./../../../../definitions";

export function runNodedDefinitionTests(definition: NamedDefinition & NodedDefinition) {
    it(`should have a tsNode`, () => {
        assert.equal(definition.tsNode != null, true);
    });

    it(`should have the correct tsNode text`, () => {
        assert.equal(definition.tsNode!.getText().indexOf(definition.name) !== -1, true);
    });
}
