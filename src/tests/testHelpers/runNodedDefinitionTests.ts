import * as assert from "assert";
import {OptionallyNamedDefinition, NamedDefinition, NodedDefinition} from "./../../definitions";

export function runNodedDefinitionTests(definition: (NamedDefinition | OptionallyNamedDefinition) & NodedDefinition) {
    runNodedDefinitionTestsForNonNamed(definition);

    if (definition.name) {
        it(`should have the correct tsNode text`, () => {
            assert.equal(definition.tsNode!.getText().indexOf(definition.name!) !== -1, true);
        });
    }
}

export function runNodedDefinitionTestsForNonNamed(definition: NodedDefinition) {
    it(`should have a tsNode`, () => {
        assert.equal(definition.tsNode != null, true);
    });
}
