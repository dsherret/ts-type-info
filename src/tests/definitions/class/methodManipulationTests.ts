import * as assert from "assert";
import {ClassMethodDefinition} from "./../../../definitions";
import {runClassMethodParameterDefinitionTests} from "./../../testHelpers";

describe("ClassMethod", () => {
    describe("#addParameter()", () => {
        const c = new ClassMethodDefinition();
        const returnedDef = c.addParameter({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isRestParameter: true,
            decorators: [{
                name: "decorator"
            }]
        });
        c.addParameter({
            name: "mySecondParameter"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, c.parameters[0]);
        });

        runClassMethodParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            type: { text: "string[]", isArray: true, arrayElementType: { text: "string" } },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true,
            decorators: [{
                name: "decorator"
            }]
        });

        runClassMethodParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
