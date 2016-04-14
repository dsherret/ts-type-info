import * as assert from "assert";
import {InterfaceDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../../testHelpers";

describe("InterfaceDefinition", () => {
    describe("getMethod", () => {
        const i = new InterfaceDefinition();
        i.addMethods({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(i.getMethod("name2"), { name: "name2" });
        runNamedDefinitionTests(i.getMethod(d => d.name === "name2"), { name: "name2" });
    });

    describe("getNewSignature", () => {
        const i = new InterfaceDefinition();
        i.addNewSignatures({ returnType: "string" }, { returnType: "number" });

        it("should equal the second definition", () => {
            assert.equal(i.getNewSignature(n => n.returnTypeExpression.text === "number"), i.newSignatures[1]);
        });
    });

    describe("getProperty", () => {
        const i = new InterfaceDefinition();
        i.addProperties({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(i.getProperty("name2"), { name: "name2" });
        runNamedDefinitionTests(i.getProperty(d => d.name === "name2"), { name: "name2" });
    });
});
