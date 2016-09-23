import * as assert from "assert";
import {TypeNodeDefinition} from "./../../../../definitions";
import {TypeTestStructure} from "./../../testStructures";
import {ensureNotNull} from "./../../ensureNotNull";
import {runNamedDefinitionTests, runBasePropertyDefinitionTests, runTypeParameteredDefinitionTests, runParameteredDefinitionTests} from "./../base";
import {runCallSignatureDefinitionTests} from "./../general";
import {runBaseExpressionDefinitionTests} from "./runBaseExpressionDefinitionTests";
import {runTypeFunctionParameterDefinitionTests} from "./runTypeFunctionParameterDefinitionTests";

export function runTypeNodeDefinitionTests(definition: TypeNodeDefinition | null, structure: TypeTestStructure) {
    describe("type expression", () => {
        ensureNotNull(definition, () => {
            runBaseExpressionDefinitionTests(definition!, structure);
            runTypeParameteredDefinitionTests(definition!, structure);
            runParameteredDefinitionTests(runTypeFunctionParameterDefinitionTests, definition!, structure);

            if (structure.arrayElementType != null) {
                describe("arrayElementType", () => {
                    runTypeNodeDefinitionTests(definition!.arrayElementType, structure.arrayElementType!);
                });
            }

            it("should have the same number of intersection types", () => {
                assert.equal(definition!.intersectionTypes.length, (structure.intersectionTypes || []).length);
            });

            describe("intersection types", () => {
                (structure.intersectionTypes || []).forEach((intersectionStructure, i) => {
                    runTypeNodeDefinitionTests(definition!.intersectionTypes[i], intersectionStructure);
                });
            });

            it("should have the same number of union types", () => {
                assert.equal(definition!.unionTypes.length, (structure.unionTypes || []).length);
            });

            describe("union types", () => {
                (structure.unionTypes || []).forEach((unionStructure, i) => {
                    runTypeNodeDefinitionTests(definition!.unionTypes[i], unionStructure);
                });
            });

            it("should have the same isArrayType property", () => {
                assert.equal(definition!.isArrayType(), structure.isArrayType || false);
            });

            // only bother checking these if they are explictly asked to be checked for
            if (structure.callSignatures != null) {
                it(`should have the same number of call signatures`, () => {
                    assert.equal(definition!.callSignatures.length, structure.callSignatures!.length);
                });

                structure.callSignatures.forEach((callSignatureTestStructure, i) => {
                    describe(`call signature ${i}`, () => {
                        ensureNotNull(definition!.callSignatures[i], () => {
                            runCallSignatureDefinitionTests(definition!.callSignatures[i], callSignatureTestStructure);
                        });
                    });
                });
            }

            if (structure.typeArguments != null) {
                it(`should have the same number of type arguments`, () => {
                    assert.equal(definition!.typeArguments.length, structure.typeArguments!.length);
                });

                structure.typeArguments.forEach((typeTestStructure, i) => {
                    describe(`type argument ${i}`, () => {
                        runTypeNodeDefinitionTests(definition!.typeArguments[i], typeTestStructure);
                    });
                });
            }

            if (structure.properties != null) {
                it(`should have the same number of properties`, () => {
                    assert.equal(definition!.properties.length, structure.properties!.length);
                });

                structure.properties.forEach((propertyTestStructure, i) => {
                    describe(`property ${i}`, () => {
                        ensureNotNull(definition!.properties[i], () => {
                            runBasePropertyDefinitionTests(definition!.properties[i], propertyTestStructure);
                        });
                    });
                });
            }

            if (structure.definitions != null) {
                it(`should have the same number of definitions`, () => {
                    assert.equal(definition!.definitions.length, structure.definitions!.length);
                });

                structure.definitions.forEach((defTestStructure, i) => {
                    describe(`definition ${defTestStructure.name}`, () => {
                        ensureNotNull(definition!.definitions[i], () => {
                            runNamedDefinitionTests(definition!.definitions[i], defTestStructure);
                        });
                    });
                });
            }

            if (structure.allDefinitions != null) {
                it(`should have the same number of getAllDefinitions()`, () => {
                    assert.equal(definition!.getAllDefinitions().length, structure.allDefinitions!.length);
                });

                structure.allDefinitions.forEach((defTestStructure, i) => {
                    const defs = definition!.getAllDefinitions();

                    describe(`definition ${defTestStructure.name}`, () => {
                        ensureNotNull(defs[i], () => {
                            runNamedDefinitionTests(defs[i], defTestStructure);
                        });
                    });
                });
            }
        });
    });
}
