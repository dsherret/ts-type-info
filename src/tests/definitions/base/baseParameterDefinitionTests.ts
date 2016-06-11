import * as assert from "assert";
import {FunctionParameterDefinition} from "./../../../definitions";
import {runObjectPropertyDefinitionTests} from "./../../testHelpers";

describe("BaseParameterDefinition", () => {
    describe("#getDestructuringProperty()", () => {
        const param = new FunctionParameterDefinition();
        param.addDestructuringProperty({
            name: "prop1",
            type: "number"
        });
        param.addDestructuringProperty({
            name: "prop2",
            type: "string"
        });

        it("should match the right definition by name", () => {
            assert.equal(param.getDestructuringProperty("prop2"), param.destructuringProperties[1]);
        });

        it("should match the right definition by function", () => {
            assert.equal(param.getDestructuringProperty(p => p.type.text === "string"), param.destructuringProperties[1]);
        });
    });

    describe("#addDestructuringProperty()", () => {
        const param = new FunctionParameterDefinition();
        const returnedDef = param.addDestructuringProperty({
            defaultExpression: "5",
            isOptional: true,
            name: "prop1",
            type: "number",
            onAfterWrite: (writer) => writer.write(""),
            onBeforeWrite: (writer) => writer.write("")
        });
        param.addDestructuringProperty({
            name: "prop2",
            type: "string"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, param.destructuringProperties[0]);
        });

        runObjectPropertyDefinitionTests(param.destructuringProperties[0], {
            defaultExpression: { text: "5"} ,
            isOptional: true,
            name: "prop1",
            type: { text: "number" },
            hasOnAfterWrite: true,
            hasOnBeforeWrite: true
        });

        runObjectPropertyDefinitionTests(param.destructuringProperties[1], {
            name: "prop2",
            type: { text: "string" }
        });
    });
});
