import {InterfaceNewSignatureDefinition} from "./../../../definitions";
import {runInterfaceNewSignatureParameterDefinitionTests} from "./../../testHelpers";

describe("InterfaceNewSignatureDefinition", () => {
    describe("addParameters", () => {
        const c = new InterfaceNewSignatureDefinition();

        c.addParameters({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isRestParameter: true
        }, {
            name: "mySecondParameter"
        });

        runInterfaceNewSignatureParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            typeExpression: { text: "string[]" },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true
        });

        runInterfaceNewSignatureParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
