import * as assert from "assert";
import {FunctionDefinition} from "./../../../definitions";

describe("BaseFunctionDefinition", () => {
    describe("getCallSignature", () => {
        const f = new FunctionDefinition();
        f.addOverloadSignatures({ returnType: "string" }, { returnType: "number" });
        it("should match the right definition", () => {
            assert.equal(f.getOverloadSignature(s => s.returnTypeExpression.text === "number"), f.overloadSignatures[1]);
        });
    });
});
