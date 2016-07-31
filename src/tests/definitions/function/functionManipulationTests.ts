import * as assert from "assert";
import {FunctionDefinition} from "./../../../definitions";
import {runFunctionParameterDefinitionTests} from "./../../testHelpers";

describe("FunctionDefinition", () => {
    describe("#addParameter()", () => {
        const c = new FunctionDefinition();
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
        c.addParameter({
            destructuringProperties: [{
                name: "param1",
                type: "string",
                defaultExpression: `""`,
                isOptional: true
            }, {
                name: "param2"
            }]
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, c.parameters[0]);
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
