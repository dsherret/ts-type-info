import * as assert from "assert";
import {OrderableDefinition} from "./../../../../definitions";
import {OrderableTestStructure} from "./../../testStructures";

export function runOrderableDefinitionTests(definition: OrderableDefinition, structure: OrderableTestStructure) {
    if (structure.order != null) {
        it(`should have an order of ${structure.order}`, () => {
            assert.equal(definition.order, structure.order);
        });
    }
}
