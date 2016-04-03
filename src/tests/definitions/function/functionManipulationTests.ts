import {FunctionDefinition} from "./../../../definitions";
import {runFunctionParameterDefinitionTests} from "./../../testHelpers";

describe("FunctionDefinition", () => {
    describe("addParameters", () => {
        const c = new FunctionDefinition();

        c.addParameters({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isRestParameter: true
        }, {
            name: "mySecondParameter"
        });

        runFunctionParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            typeExpression: { text: "string[]" },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true
        });

        runFunctionParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
