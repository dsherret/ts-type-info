import * as assert from "assert";
import {TypeExpressionDefinition} from "./../../../../definitions";
import {TypeExpressionTestStructure} from "./../../testStructures";
import {ensureNotNull} from "./../../ensureNotNull";
import {runNamedDefinitionTests, runBasePropertyDefinitionTests} from "./../base";
import {runCallSignatureDefinitionTests} from "./../general";

export function runTypeExpressionDefinitionTests(definition: TypeExpressionDefinition, structure: TypeExpressionTestStructure) {
    describe("type expression", () => {
        ensureNotNull(definition, () => {
            it(`should have a type text of ${structure.text}`, () => {
                assert.equal(definition.text, structure.text);
            });

            if (structure.arrayElementTypeExpression != null) {
                describe("arrayElementTypeExpression", () => {
                    runTypeExpressionDefinitionTests(definition.arrayElementTypeExpression, structure.arrayElementTypeExpression);
                });
            }

            it("should have the same number of intersection types", () => {
                assert.equal(definition.intersectionTypeExpressions.length, (structure.intersectionTypeExpressions || []).length);
            });

            describe("intersection types", () => {
                (structure.intersectionTypeExpressions || []).forEach((intersectionStructure, i) => {
                    runTypeExpressionDefinitionTests(definition.intersectionTypeExpressions[i], intersectionStructure);
                });
            });

            it("should have the same number of union types", () => {
                assert.equal(definition.unionTypeExpressions.length, (structure.unionTypeExpressions || []).length);
            });

            describe("union types", () => {
                (structure.unionTypeExpressions || []).forEach((unionStructure, i) => {
                    runTypeExpressionDefinitionTests(definition.unionTypeExpressions[i], unionStructure);
                });
            });

            it("should have the same isArray property", () => {
                assert.equal(definition.isArray(), structure.isArray || false);
            });

            // only bother checking these if they are explictly asked to be checked for
            if (structure.callSignatures != null) {
                it(`should have the same number of call signatures`, () => {
                    assert.equal(definition.callSignatures.length, structure.callSignatures.length);
                });

                structure.callSignatures.forEach((callSignatureTestStructure, i) => {
                    describe(`call signature ${i}`, () => {
                        ensureNotNull(definition.callSignatures[i], () => {
                            runCallSignatureDefinitionTests(definition.callSignatures[i], callSignatureTestStructure);
                        });
                    });
                });
            }

            if (structure.typeArguments != null) {
                it(`should have the same number of type arguments`, () => {
                    assert.equal(definition.typeArguments.length, structure.typeArguments.length);
                });

                structure.typeArguments.forEach((typeTestStructure, i) => {
                    runTypeExpressionDefinitionTests(definition.typeArguments[i], typeTestStructure);
                });
            }

            if (structure.properties != null) {
                it(`should have the same number of properties`, () => {
                    assert.equal(definition.properties.length, structure.properties.length);
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
                    assert.equal(definition.definitions.length, structure.definitions.length);
                });

                structure.definitions.forEach((defTestStructure, i) => {
                    it(`definition ${defTestStructure.name}`, () => {
                        ensureNotNull(definition.definitions[i], () => {
                            runNamedDefinitionTests(definition.definitions[i], defTestStructure);
                        });
                    });
                });
            }
        });
    });
}
