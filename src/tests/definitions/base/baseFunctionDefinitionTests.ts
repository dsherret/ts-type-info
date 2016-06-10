import * as assert from "assert";
import {FunctionDefinition} from "./../../../definitions";
import {runCallSignatureDefinitionTests} from "./../../testHelpers";

describe("BaseFunctionDefinition", () => {
    describe("getCallSignature", () => {
        const f = new FunctionDefinition();
        f.addOverloadSignatures({ returnType: "string" }, { returnType: "number" });
        it("should match the right definition", () => {
            assert.equal(f.getOverloadSignature(s => s.returnType.text === "number"), f.overloadSignatures[1]);
        });
    });

    describe("addCallSignatures", () => {
        const f = new FunctionDefinition();
        f.addOverloadSignatures({
            returnType: "string",
            typeParameters: [{ name: "T" }],
            parameters: [{ name: "myParam" }]
        }, {
            returnType: "number"
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
});
