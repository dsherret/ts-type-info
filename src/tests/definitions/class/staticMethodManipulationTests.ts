import * as assert from "assert";
import {ClassStaticMethodDefinition} from "./../../../definitions";
import {runClassStaticMethodParameterDefinitionTests} from "./../../testHelpers";

describe("ClassStaticMethod", () => {
    describe("#addParameter()", () => {
        const m = new ClassStaticMethodDefinition();
        const returnedDef = m.addParameter({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isRestParameter: true,
            decorators: [{
                name: "decorator"
            }]
        });
        m.addParameter({
            name: "mySecondParameter"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, m.parameters[0]);
        });

        runClassStaticMethodParameterDefinitionTests(m.parameters[0], {
            name: "myParameter",
            type: { text: "string[]", isArrayType: true, arrayElementType: { text: "string" } },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true,
            decorators: [{
                name: "decorator"
            }]
        });

        runClassStaticMethodParameterDefinitionTests(m.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
