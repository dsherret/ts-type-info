import * as assert from "assert";
import {TypeDefinition} from "./../../../definitions";

describe("TypeDefinition", () => {
    describe("#getIntersectionType()", () => {
        const def = new TypeDefinition();
        def.intersectionTypes.push({ text: "" } as any, { text: "test" } as any);

        it("should get the correct type", () => {
            assert.equal(def.getIntersectionType(c => c.text === "test"), def.intersectionTypes[1]);
        });
    });

    describe("#getUnionType()", () => {
        const def = new TypeDefinition();
        def.unionTypes.push({ text: "" } as any, { text: "test" } as any);

        it("should get the correct type", () => {
            assert.equal(def.getUnionType(c => c.text === "test"), def.unionTypes[1]);
        });
    });

    describe("#getCallSignature()", () => {
        const def = new TypeDefinition();
        def.callSignatures.push({ parameters: [] } as any, { parameters: [{} as any] } as any);

        it("should get the correct call signature", () => {
            assert.equal(def.getCallSignature(c => c.parameters.length === 1), def.callSignatures[1]);
        });
    });

    describe("#getDefinition()", () => {
        const def = new TypeDefinition();
        def.definitions.push({ name: "def1" } as any, { name: "def2" } as any);

        it("should get the correct definition", () => {
            assert.equal(def.getDefinition(d => d.name === "def2"), def.definitions[1]);
        });
    });

    describe("#getProperty()", () => {
        const def = new TypeDefinition();
        def.properties.push({ name: "prop1" } as any, { name: "prop2" } as any);

        it("should get the correct property", () => {
            assert.equal(def.getProperty(d => d.name === "prop2"), def.properties[1]);
        });
    });

    describe("#getTypeArgument()", () => {
        const def = new TypeDefinition();
        def.typeArguments.push({ text: "text1" } as any, { text: "text2" } as any);

        it("should get the correct type argument", () => {
            assert.equal(def.getTypeArgument(d => d.text === "text2"), def.typeArguments[1]);
        });
    });
});
