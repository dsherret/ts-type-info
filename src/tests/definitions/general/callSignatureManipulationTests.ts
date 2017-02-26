import {createCallSignature} from "./../../../createFunctions";
import {CallSignatureDefinition} from "./../../../definitions";
import {runCallSignatureDefinitionTests, runCallSignatureParameterDefinitionTests} from "./../../testHelpers";

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

    describe("#setUserDefinedTypeGuard()", () => {
        const c = createCallSignature({
            parameters: [{ name: "myParam" }]
        });
        c.setUserDefinedTypeGuard({
            parameterName: "myParam",
            type: "string"
        });
        runCallSignatureDefinitionTests(c, {
            parameters: [{ name: "myParam" }],
            userDefinedTypeGuard: {
                parameterName: "myParam",
                type: { text: "string" }
            },
            returnType: { text: "myParam is string" },
            minArgumentCount: 1
        });
    });
});
