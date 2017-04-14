import * as assert from "assert";
import {TypeDefinition} from "./../../../definitions";
import {createType} from "./../../../createFunctions";
import {runTypeDefinitionTests} from "./../../testHelpers";

describe("TypeDefinition", () => {
    describe("#getCallSignature()", () => {
        const def = new TypeDefinition();
        def.callSignatures.push({ parameters: [] } as any, { parameters: [{} as any] } as any);

        it("should get the correct call signature", () => {
            assert.equal(def.getCallSignature(c => c.parameters.length === 1), def.callSignatures[1]);
        });
    });

    describe("#addUnionType", () => {
        describe("no existing union type", () => {
            const def = createType("string");
            def.addUnionType("number");
            runTypeDefinitionTests(def, {
                text: "string | number",
                unionTypes: [{
                    text: "string"
                }, {
                    text: "number"
                }]
            });
        });

        describe("pass in definition", () => {
            const def = createType("number");
            const def2 = createType("string");
            def.addUnionType(def2);
            runTypeDefinitionTests(def, {
                text: "number | string",
                unionTypes: [
                    { text: "number" },
                    { text: "string" }
                ]
            });
        });

        describe("existing union type", () => {
            const def = createType("string");
            def.addUnionType("Date");
            def.addUnionType("number");
            runTypeDefinitionTests(def, {
                text: "string | Date | number",
                unionTypes: [{
                    text: "string"
                }, {
                    text: "Date"
                }, {
                    text: "number"
                }]
            });
        });

        describe("union type equals type", () => {
            const def = createType("number");
            def.addUnionType("number");
            runTypeDefinitionTests(def, {
                text: "number",
                unionTypes: []
            });
        });
    });

    describe("#addIntersectionType", () => {
        describe("no existing intersection type", () => {
            const def = createType("string");
            def.addIntersectionType("number");
            runTypeDefinitionTests(def, {
                text: "string & number",
                intersectionTypes: [
                    { text: "string" },
                    { text: "number" }
                ]
            });
        });

        describe("pass in definition", () => {
            const def = createType("number");
            const def2 = createType("string");
            def.addIntersectionType(def2);
            runTypeDefinitionTests(def, {
                text: "number & string",
                intersectionTypes: [
                    { text: "number" },
                    { text: "string" }
                ]
            });
        });

        describe("existing intersection type", () => {
            const def = createType("string");
            def.addIntersectionType("Date");
            def.addIntersectionType("number");
            runTypeDefinitionTests(def, {
                text: "string & Date & number",
                intersectionTypes: [{
                    text: "string"
                }, {
                    text: "Date"
                }, {
                    text: "number"
                }]
            });
        });

        describe("existing union type", () => {
            const def = createType("string");
            def.addUnionType("Date");
            def.addIntersectionType("number");
            runTypeDefinitionTests(def, {
                text: "(string | Date) & number",
                intersectionTypes: [{
                    text: "string | Date",
                    unionTypes: [{
                        text: "string"
                    }, {
                        text: "Date"
                    }]
                }, {
                    text: "number"
                }]
            });
        });

        describe("intersection type equals type", () => {
            const def = createType("number");
            def.addIntersectionType("number");
            runTypeDefinitionTests(def, {
                text: "number",
                intersectionTypes: []
            });
        });
    });

    describe("#text", () => {
        const def = new TypeDefinition();
        def.text = "MyClass | MyOtherClass";
        runTypeDefinitionTests(def, {
            text: "MyClass | MyOtherClass"
        });
    });
});
