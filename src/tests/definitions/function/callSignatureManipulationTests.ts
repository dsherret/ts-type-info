import {CallSignatureDefinition} from "./../../../definitions";
import {runCallSignatureParameterDefinitionTests} from "./../../testHelpers";

describe("CallSignatureDefinition", () => {
    describe("addParameters", () => {
        const c = new CallSignatureDefinition();

        c.addParameters({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isRestParameter: true
        }, {
            name: "mySecondParameter"
        });

        runCallSignatureParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            typeExpression: { text: "string[]", isArray: true, arrayElementTypeExpression: { text: "string" } },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true
        });

        runCallSignatureParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
