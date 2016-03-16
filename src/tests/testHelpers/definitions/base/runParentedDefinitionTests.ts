import * as assert from "assert";
import {ParentedDefinition} from "./../../../../definitions";

export function runParentedDefinitionTests(definition: ParentedDefinition<any>) {
    it(`should have a parent`, () => {
        assert.equal(definition.parent != null, true);
    });
}
