import * as assert from "assert";
import {CallSignatureDefinition} from "./../../../definitions";
import {runCallSignatureParameterDefinitionTests} from "./../../testHelpers";

describe("CallSignatureDefinition", () => {
    describe("#addParameter()", () => {
        const c = new CallSignatureDefinition();
        const returnedDef = c.addParameter({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isRestParameter: true
        });
        c.addParameter({
            name: "mySecondParameter"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, c.parameters[0]);
        });

        runCallSignatureParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            type: { text: "string[]", isArrayType: true, arrayElementType: { text: "string" } },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true
        });

        runCallSignatureParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
