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

        describe("existing union type", () => {
            const def = createType("string | Date");
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
    });

    describe("#text", () => {
        const def = new TypeDefinition();
        def.text = "MyClass | MyOtherClass";
        runTypeDefinitionTests(def, {
            text: "MyClass | MyOtherClass",
            unionTypes: [{
                text: "MyClass"
            }, {
                text: "MyOtherClass"
            }]
        });
    });
});
