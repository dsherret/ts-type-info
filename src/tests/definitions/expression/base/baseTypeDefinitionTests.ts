import * as assert from "assert";
import {BaseTypeDefinition, TypeDefinition} from "./../../../../definitions";

describe("BaseTypeDefinition", () => {
    function getNewDef() {
        return new TypeDefinition() as BaseTypeDefinition;
    }

    describe("#getIntersectionType()", () => {
        const def = getNewDef();
        def.intersectionTypes.push({ text: "" } as any, { text: "test" } as any);

        it("should get the correct type", () => {
            assert.equal(def.getIntersectionType(c => c.text === "test"), def.intersectionTypes[1]);
        });
    });

    describe("#getUnionType()", () => {
        const def = getNewDef();
        def.unionTypes.push({ text: "" } as any, { text: "test" } as any);

        it("should get the correct type", () => {
            assert.equal(def.getUnionType(c => c.text === "test"), def.unionTypes[1]);
        });
    });

    describe("#getDefinition()", () => {
        const def = getNewDef();
        def.definitions.push({ name: "def1" } as any, { name: "def2" } as any);

        it("should get the correct definition", () => {
            assert.equal(def.getDefinition(d => d.name === "def2"), def.definitions[1]);
        });
    });

    describe("#getProperty()", () => {
        const def = getNewDef();
        def.properties.push({ name: "prop1" } as any, { name: "prop2" } as any);

        it("should get the correct property", () => {
            assert.equal(def.getProperty(d => d.name === "prop2"), def.properties[1]);
        });
    });

    describe("#getTypeArgument()", () => {
        const def = getNewDef();
        def.typeArguments.push({ text: "text1" } as any, { text: "text2" } as any);

        it("should get the correct type argument", () => {
            assert.equal(def.getTypeArgument(d => d.text === "text2"), def.typeArguments[1]);
        });
    });
});
