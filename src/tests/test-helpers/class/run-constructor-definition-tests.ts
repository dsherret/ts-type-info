import * as assert from "assert";
import {Constructor} from "./../structures";
import {ConstructorDefinition} from "./../../../definitions";
import {runParameteredDefinitionTests} from "./../function";

export function runConstructorDefinitionTests(definition: ConstructorDefinition, constructor: Constructor) {
    if (constructor == null) {
        it("should not have a constructor", () => {
            assert.equal(definition, null);
        });
    }
    else {
        it("should have a constructor", () => {
            assert.notEqual(definition, null);
        });

        runParameteredDefinitionTests(definition, constructor.parameters);
    }
}
