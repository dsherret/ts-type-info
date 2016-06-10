import * as assert from "assert";
import {FunctionParameterDefinition} from "./../../../definitions";
import {runObjectPropertyDefinitionTests} from "./../../testHelpers";

describe("BaseParameterDefinition", () => {
    describe("getDestructuringProperty", () => {
        const param = new FunctionParameterDefinition();
        param.addDestructuringProperties({
            name: "prop1",
            type: "number"
        }, {
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

    describe("addDestructuringProperties", () => {
        const param = new FunctionParameterDefinition();
        param.addDestructuringProperties({
            defaultExpression: "5",
            isOptional: true,
            name: "prop1",
            type: "number",
            onAfterWrite: (writer) => writer.write(""),
            onBeforeWrite: (writer) => writer.write("")
        }, {
            name: "prop2",
            type: "string"
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
