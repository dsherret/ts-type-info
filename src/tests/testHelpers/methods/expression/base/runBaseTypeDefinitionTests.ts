import * as assert from "assert";
import {BaseTypeDefinition, TypeDefinition} from "./../../../../../definitions";
import {BaseTypeTestStructure, TypeTestStructure} from "./../../../testStructures";
import {ensureNotNull} from "./../../../ensureNotNull";
import {runNamedDefinitionTests, runBasePropertyDefinitionTests} from "./../../base";
import {runBaseExpressionDefinitionTests} from "./runBaseExpressionDefinitionTests";

export function runBaseTypeDefinitionTests(
        definition: BaseTypeDefinition,
        structure: BaseTypeTestStructure,
        runTypeDefinitionTests: (definition: TypeDefinition | null, structure: TypeTestStructure) => void
    ) {
    runBaseExpressionDefinitionTests(definition, structure);

    if (structure.arrayElementType != null) {
        describe("arrayElementType", () => {
            runTypeDefinitionTests(definition.arrayElementType, structure.arrayElementType!);
        });
    }

    it("should have the same number of intersection types", () => {
        assert.equal(definition.intersectionTypes.length, (structure.intersectionTypes || []).length);
    });

    describe("intersection types", () => {
        (structure.intersectionTypes || []).forEach((intersectionStructure, i) => {
            runTypeDefinitionTests(definition.intersectionTypes[i], intersectionStructure);
        });
    });

    it("should have the same number of union types", () => {
        assert.equal(definition.unionTypes.length, (structure.unionTypes || []).length);
    });

    describe("union types", () => {
        (structure.unionTypes || []).forEach((unionStructure, i) => {
            runTypeDefinitionTests(definition.unionTypes[i], unionStructure);
        });
    });

    it(`should have the same ${nameof(structure.isArrayType)} property`, () => {
        assert.equal(definition.isArrayType(), structure.isArrayType || false);
    });

    if (structure.typeArguments != null) {
        it(`should have the same number of type arguments`, () => {
            assert.equal(definition.typeArguments.length, structure.typeArguments!.length);
        });

        structure.typeArguments.forEach((typeTestStructure, i) => {
            describe(`type argument ${i}`, () => {
                runTypeDefinitionTests(definition.typeArguments[i], typeTestStructure);
            });
        });
    }

    if (structure.properties != null) {
        it(`should have the same number of properties`, () => {
            assert.equal(definition.properties.length, structure.properties!.length);
        });

        structure.properties.forEach((propertyTestStructure, i) => {
            describe(`property ${i}`, () => {
                ensureNotNull(definition.properties[i], () => {
                    runBasePropertyDefinitionTests(definition.properties[i], propertyTestStructure);
                });
            });
        });
    }

    if (structure.definitions != null) {
        it(`should have the same number of definitions`, () => {
            assert.equal(definition.definitions.length, structure.definitions!.length);
        });

        structure.definitions.forEach((defTestStructure, i) => {
            describe(`definition ${defTestStructure.name}`, () => {
                ensureNotNull(definition.definitions[i], () => {
                    runNamedDefinitionTests(definition.definitions[i], defTestStructure);
                });
            });
        });
    }

    if (structure.allDefinitions != null) {
        it(`should have the same number of getAllDefinitions()`, () => {
            assert.equal(definition.getAllDefinitions().length, structure.allDefinitions!.length);
        });

        structure.allDefinitions.forEach((defTestStructure, i) => {
            const defs = definition.getAllDefinitions();

            describe(`definition ${defTestStructure.name}`, () => {
                ensureNotNull(defs[i], () => {
                    runNamedDefinitionTests(defs[i], defTestStructure);
                });
            });
        });
    }
}
