import * as assert from "assert";
import {OverloadSignaturedTestStructure} from "./../../testStructures";
import {OverloadSignaturedDefinition} from "./../../../../definitions";
import {runCallSignatureDefinitionTests} from "./../general";

export function runOverloadSignaturedDefinitionTests(definition: OverloadSignaturedDefinition, structure: OverloadSignaturedTestStructure) {
    structure.overloadSignatures = structure.overloadSignatures || [];

    it("should have the same number of overload signatures", () => {
        assert.equal(definition.overloadSignatures.length, structure.overloadSignatures!.length);
    });

    describe("overloadSignatures", () => {
        structure.overloadSignatures!.forEach((overloadSignatureStructure, i) => {
            runCallSignatureDefinitionTests(definition.overloadSignatures[i], overloadSignatureStructure);
        });
    });
}
