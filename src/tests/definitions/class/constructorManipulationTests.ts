import * as assert from "assert";
import {ClassConstructorDefinition, ClassConstructorParameterScope} from "./../../../definitions";
import {runClassConstructorParameterDefinitionTests} from "./../../testHelpers";

describe("ClassConstructor", () => {
    describe("#addParameter()", () => {
        const c = new ClassConstructorDefinition();
        const returnedDef = c.addParameter({
            name: "myParameter",
            type: "string[]",
            defaultExpression: `["test"]`,
            isOptional: true,
            isReadonly: true,
            isRestParameter: true,
            scope: ClassConstructorParameterScope.Private
        });
        c.addParameter({
            name: "mySecondParameter"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, c.parameters[0]);
        });

        runClassConstructorParameterDefinitionTests(c.parameters[0], {
            name: "myParameter",
            type: { text: "string[]", isArrayType: true, arrayElementType: { text: "string" } },
            defaultExpression: { text: `["test"]` },
            isOptional: true,
            isReadonly: true,
            isRestParameter: true,
            scope: ClassConstructorParameterScope.Private
        });

        runClassConstructorParameterDefinitionTests(c.parameters[1], {
            name: "mySecondParameter"
        });
    });
});
