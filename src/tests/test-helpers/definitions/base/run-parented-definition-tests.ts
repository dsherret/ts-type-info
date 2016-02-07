import * as assert from "assert";
import {IParentedDefinition} from "./../../../../definitions";

export function runParentedDefinitionTests(definition: IParentedDefinition<any>) {
    it(`should have a parent`, () => {
        assert.equal(definition.parent != null, true);
    });
}
