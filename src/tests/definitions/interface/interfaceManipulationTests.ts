import * as assert from "assert";
import {InterfaceDefinition} from "./../../../definitions";
import {runCallSignatureDefinitionTests, runIndexSignatureDefinitionTests, runInterfaceMethodDefinitionTests,
    runInterfacePropertyDefinitionTests} from "./../../testHelpers";

describe("InterfaceDefinition", () => {
    describe("addCallSignatures()", () => {
        const i = new InterfaceDefinition();
        i.addCallSignatures({
            returnType: "string",
            parameters: [{ name: "myParam" }],
            typeParameters: [{ name: "T" }]
        }, {
            returnType: "number"
        });

        runCallSignatureDefinitionTests(i.callSignatures[0], {
            returnTypeExpression: { text: "string" },
            parameters: [{ name: "myParam" }],
            typeParameters: [{ name: "T" }],
            minArgumentCount: 1
        });

        runCallSignatureDefinitionTests(i.callSignatures[1], {
            returnTypeExpression: { text: "number" }
        });
    });

    describe("addExtends()", () => {
        const i = new InterfaceDefinition();
        i.addExtends("test", "test2");

        it("should have two extends expressions", () => {
            assert.equal(i.extendsTypeExpressions.length, 2);
        });

        it("should have a test expression", () => {
            assert.equal(i.extendsTypeExpressions[0].text, "test");
        });
    });

    describe("addIndexSignatures()", () => {
        const i = new InterfaceDefinition();
        i.addIndexSignatures({
            keyName: "num",
            keyType: "number",
            returnType: "Date"
        }, {
            keyName: "str",
            returnType: "number"
        });

        runIndexSignatureDefinitionTests(i.indexSignatures[0], {
            keyName: "num",
            keyTypeExpression: { text: "number" },
            returnTypeExpression: { text: "Date" }
        });

        runIndexSignatureDefinitionTests(i.indexSignatures[1], {
            keyName: "str",
            keyTypeExpression: { text: "string" }, // defaults to string
            returnTypeExpression: { text: "number" }
        });
    });

    describe("addMethods()", () => {
        const i = new InterfaceDefinition();
        i.addMethods({
            name: "myMethod1",
            typeParameters: [{ name: "T" }],
            returnType: "string",
            parameters: [{ name: "myParam" }]
        }, {
            name: "myMethod2"
        });

        runInterfaceMethodDefinitionTests(i.methods[0], {
            name: "myMethod1",
            typeParameters: [{ name: "T" }],
            returnTypeExpression: { text: "string" },
            parameters: [{ name: "myParam" }]
        });

        runInterfaceMethodDefinitionTests(i.methods[1], {
            name: "myMethod2"
        });
    });

    describe("addProperties()", () => {
        const i = new InterfaceDefinition();

        i.addProperties({
            isOptional: true,
            name: "myProperty1",
            type: "string"
        }, {
            name: "myProperty2"
        });

        runInterfacePropertyDefinitionTests(i.properties[0], {
            isOptional: true,
            name: "myProperty1",
            typeExpression: { text: "string" }
        });

        runInterfacePropertyDefinitionTests(i.properties[1], {
            name: "myProperty2"
        });
    });

    describe("addNewSignatures()", () => {
        const i = new InterfaceDefinition();
        i.addNewSignatures({
            returnType: "string",
            parameters: [{ name: "myParam" }],
            typeParameters: [{ name: "T" }]
        }, {
            returnType: "number"
        });

        runCallSignatureDefinitionTests(i.newSignatures[0], {
            returnTypeExpression: { text: "string" },
            parameters: [{ name: "myParam" }],
            typeParameters: [{ name: "T" }],
            minArgumentCount: 1
        });

        runCallSignatureDefinitionTests(i.newSignatures[1], {
            returnTypeExpression: { text: "number" }
        });
    });
});
