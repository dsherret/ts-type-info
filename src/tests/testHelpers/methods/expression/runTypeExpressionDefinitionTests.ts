import * as assert from "assert";
import {TypeExpressionDefinition} from "./../../../../definitions";
import {TypeExpressionTestStructure} from "./../../testStructures";
import {ensureNotNull} from "./../../ensureNotNull";
import {runTypeDefinitionTests} from "./runTypeDefinitionTests";

export function runTypeExpressionDefinitionTests(definition: TypeExpressionDefinition, structure: TypeExpressionTestStructure) {
    describe("type expression", () => {
        ensureNotNull(definition, () => {
            it(`should have a type text of ${structure.text}`, () => {
                assert.equal(definition.text, structure.text);
            });

            // only bother checking these if they are explictly asked to be checked for
            if (structure.types != null) {
                it("should have the same number of types", () => {
                    assert.equal(definition.types.length, structure.types.length);
                });

                structure.types.forEach((typeTestStructure, i) => {
                    runTypeDefinitionTests(definition.types[i], typeTestStructure);
                });
            }

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
        });
    });
}
