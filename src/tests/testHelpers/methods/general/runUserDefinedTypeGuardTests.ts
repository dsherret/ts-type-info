import * as assert from "assert";
import {UserDefinedTypeGuardTestStructure} from "./../../testStructures";
import {UserDefinedTypeGuardDefinition} from "./../../../../definitions";

export function runUserDefinedTypeGuardTests(definition: UserDefinedTypeGuardDefinition, structure: UserDefinedTypeGuardTestStructure) {
    if (structure == null) {
        it("should not have a user defined type guard", () => {
            assert.equal(definition == null, true);
        });
    }
    else {
        describe(`user defined type guard`, () => {
            it("should have the correct parameter name", () => {
                assert.equal(definition.parameterName || "", structure.parameterName || "");
            });

            it("should have the correct type", () => {
                assert.equal(definition.type.text, structure.type);
            });
        });
    }
}
