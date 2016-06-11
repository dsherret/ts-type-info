import * as assert from "assert";
import {InterfaceDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../../testHelpers";

describe("InterfaceDefinition", () => {
    describe("getCallSignature", () => {
        const i = new InterfaceDefinition();
        i.addCallSignature({ returnType: "string" });
        i.addCallSignature({ returnType: "number" });

        it("should equal the second definition", () => {
            assert.equal(i.getCallSignature(n => n.returnType.text === "number"), i.callSignatures[1]);
        });
    });

    describe("getIndexSignature", () => {
        const i = new InterfaceDefinition();
        i.addIndexSignature({ keyName: "str", returnType: "string" });
        i.addIndexSignature({ keyName: "num", returnType: "number" });

        it("should equal the second definition", () => {
            assert.equal(i.getIndexSignature(n => n.returnType.text === "number"), i.indexSignatures[1]);
        });
    });

    describe("getMethod", () => {
        const i = new InterfaceDefinition();
        i.addMethod({ name: "name1" });
        i.addMethod({ name: "name2" });
        runNamedDefinitionTests(i.getMethod("name2"), { name: "name2" });
        runNamedDefinitionTests(i.getMethod(d => d.name === "name2"), { name: "name2" });
    });

    describe("getNewSignature", () => {
        const i = new InterfaceDefinition();
        i.addNewSignature({ returnType: "string" });
        i.addNewSignature({ returnType: "number" });

        it("should equal the second definition", () => {
            assert.equal(i.getNewSignature(n => n.returnType.text === "number"), i.newSignatures[1]);
        });
    });

    describe("getProperty", () => {
        const i = new InterfaceDefinition();
        i.addProperty({ name: "name1" });
        i.addProperty({ name: "name2" });
        runNamedDefinitionTests(i.getProperty("name2"), { name: "name2" });
        runNamedDefinitionTests(i.getProperty(d => d.name === "name2"), { name: "name2" });
    });
});
