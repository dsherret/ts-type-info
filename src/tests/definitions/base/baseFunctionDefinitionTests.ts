import * as assert from "assert";
import {FunctionDefinition} from "./../../../definitions";
import {runCallSignatureDefinitionTests} from "./../../testHelpers";

describe("BaseFunctionDefinition", () => {
    describe("#addCallSignature()", () => {
        const f = new FunctionDefinition();
        const returnedDef = f.addOverloadSignature({
            returnType: "string",
            typeParameters: [{ name: "T" }],
            parameters: [{ name: "myParam" }]
        });
        f.addOverloadSignature({
            returnType: "number"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, f.overloadSignatures[0]);
        });

        runCallSignatureDefinitionTests(f.overloadSignatures[0], {
            returnType: { text: "string" },
            typeParameters: [{ name: "T" }],
            parameters: [{ name: "myParam" }],
            minArgumentCount: 1
        });

        runCallSignatureDefinitionTests(f.overloadSignatures[1], {
            returnType: { text: "number" }
        });
    });

    describe("#getCallSignature()", () => {
        const f = new FunctionDefinition();
        f.addOverloadSignature({ returnType: "string" });
        f.addOverloadSignature({ returnType: "number" });
        it("should match the right definition", () => {
            assert.equal(f.getOverloadSignature(s => s.returnType.text === "number"), f.overloadSignatures[1]);
        });
    });
});
