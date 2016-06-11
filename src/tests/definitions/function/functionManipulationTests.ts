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
        }, {
            name: null,
            destructuringProperties: [{
                name: "param1",
                type: "string",
                defaultExpression: `""`,
                isOptional: true
            }, {
                name: "param2"
            }]
        });

        runFunctionParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            type: { text: "string[]", isArray: true, arrayElementType: { text: "string" } },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true
        });

        runFunctionParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });

        runFunctionParameterDefinitionTests(c.parameters[2], {
            name: null,
            destructuringProperties: [{
                name: "param1",
                type: { text: "string" },
                defaultExpression: { text: `""` },
                isOptional: true
            }, {
                name: "param2"
            }]
        });
    });
});
