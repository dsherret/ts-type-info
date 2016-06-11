import * as assert from "assert";
import {InterfaceMethodDefinition} from "./../../../definitions";
import {runInterfaceMethodParameterDefinitionTests} from "./../../testHelpers";

describe("InterfaceMethodDefinition", () => {
    describe("#addParameter()", () => {
        const m = new InterfaceMethodDefinition();
        const returnedDef = m.addParameter({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isRestParameter: true
        });
        m.addParameter({
            name: "mySecondParameter"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, m.parameters[0]);
        });

        runInterfaceMethodParameterDefinitionTests(m.parameters[0], {
            name: "myParameter",
            type: { text: "string[]", isArray: true, arrayElementType: { text: "string" } },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isRestParameter: true
        });

        runInterfaceMethodParameterDefinitionTests(m.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
