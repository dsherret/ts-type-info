import * as assert from "assert";
import {TypeNodeDefinition} from "./../../../definitions";

describe("TypeNodeDefinition", () => {
    describe("#getIntersectionType()", () => {
        const def = new TypeNodeDefinition();
        def.intersectionTypes.push({ text: "" } as any, { text: "test" } as any);

        it("should get the correct type", () => {
            assert.equal(def.getIntersectionType(c => c.text === "test"), def.intersectionTypes[1]);
        });
    });

    describe("#getUnionType()", () => {
        const def = new TypeNodeDefinition();
        def.unionTypes.push({ text: "" } as any, { text: "test" } as any);

        it("should get the correct type", () => {
            assert.equal(def.getUnionType(c => c.text === "test"), def.unionTypes[1]);
        });
    });

    describe("#getCallSignature()", () => {
        const def = new TypeNodeDefinition();
        def.callSignatures.push({ parameters: [] } as any, { parameters: [{} as any] } as any);

        it("should get the correct call signature", () => {
            assert.equal(def.getCallSignature(c => c.parameters.length === 1), def.callSignatures[1]);
        });
    });

    describe("#getDefinition()", () => {
        const def = new TypeNodeDefinition();
        def.definitions.push({ name: "def1" } as any, { name: "def2" } as any);

        it("should get the correct definition", () => {
            assert.equal(def.getDefinition(d => d.name === "def2"), def.definitions[1]);
        });
    });

    describe("#getProperty()", () => {
        const def = new TypeNodeDefinition();
        def.properties.push({ name: "prop1" } as any, { name: "prop2" } as any);

        it("should get the correct property", () => {
            assert.equal(def.getProperty(d => d.name === "prop2"), def.properties[1]);
        });
    });

    describe("#getTypeArgument()", () => {
        const def = new TypeNodeDefinition();
        def.typeArguments.push({ text: "text1" } as any, { text: "text2" } as any);

        it("should get the correct type argument", () => {
            assert.equal(def.getTypeArgument(d => d.text === "text2"), def.typeArguments[1]);
        });
    });

    describe("#addTypeParameter()", () => {
        const def = new TypeNodeDefinition();
        it("should throw an error saying that addTypeParameter is not supported", () => {
            assert.throws(() => {
                def.addTypeParameter({ name: "T" });
            });
        });
    });

    describe("#addParameter()", () => {
        const def = new TypeNodeDefinition();
        it("should throw an error saying that addParameter is not supported", () => {
            assert.throws(() => {
                def.addParameter({ name: "a" });
            });
        });
    });
});
