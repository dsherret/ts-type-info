import * as assert from "assert";
import {InterfaceDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../../testHelpers";

describe("InterfaceDefinition", () => {
    describe("getCallSignature", () => {
        const i = new InterfaceDefinition();
        i.addCallSignatures({ returnType: "string" }, { returnType: "number" });

        it("should equal the second definition", () => {
            assert.equal(i.getCallSignature(n => n.returnType.text === "number"), i.callSignatures[1]);
        });
    });

    describe("getIndexSignature", () => {
        const i = new InterfaceDefinition();
        i.addIndexSignatures({ keyName: "str", returnType: "string" }, { keyName: "num", returnType: "number" });

        it("should equal the second definition", () => {
            assert.equal(i.getIndexSignature(n => n.returnType.text === "number"), i.indexSignatures[1]);
        });
    });

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
            assert.equal(i.getNewSignature(n => n.returnType.text === "number"), i.newSignatures[1]);
        });
    });

    describe("getProperty", () => {
        const i = new InterfaceDefinition();
        i.addProperties({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(i.getProperty("name2"), { name: "name2" });
        runNamedDefinitionTests(i.getProperty(d => d.name === "name2"), { name: "name2" });
    });
});
