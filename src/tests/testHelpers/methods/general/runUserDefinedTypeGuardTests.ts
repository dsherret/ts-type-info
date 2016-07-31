import * as assert from "assert";
import {UserDefinedTypeGuardTestStructure} from "./../../testStructures";
import {UserDefinedTypeGuardDefinition} from "./../../../../definitions";
import {ensureNotNull} from "./../../ensureNotNull";

export function runUserDefinedTypeGuardTests(definition: UserDefinedTypeGuardDefinition | null, structure: UserDefinedTypeGuardTestStructure | undefined) {
    if (structure == null) {
        it("should not have a user defined type guard", () => {
            assert.equal(definition == null, true);
        });
    }
    else {
        describe(`user defined type guard`, () => {
            ensureNotNull(definition, () => {
                it("should have the correct parameter name", () => {
                    assert.equal(definition!.parameterName || "", structure!.parameterName || "");
                });

                it("should have the correct type", () => {
                    assert.equal(definition!.type.text, structure!.type);
                });
            });
        });
    }
}
