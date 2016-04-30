import * as assert from "assert";
import {TypeExpressionDefinition} from "./../../../../definitions";
import {TypeExpressionTestStructure} from "./../../testStructures";
import {ensureNotNull} from "./../../ensureNotNull";
import {runTypeDefinitionTests} from "./runTypeDefinitionTests";

export function runTypeExpressionDefinitionTests(typeExpression: TypeExpressionDefinition, structure: TypeExpressionTestStructure) {
    describe("type expression", () => {
        ensureNotNull(typeExpression, () => {
            it(`should have a type text of ${structure.text}`, () => {
                assert.equal(typeExpression.text, structure.text);
            });

            // only bother checking these types if they are explictly asked to be checked for
            if (structure.types != null) {
                it("should have the same number of types", () => {
                    assert.equal(typeExpression.types.length, structure.types.length);
                });

                structure.types.forEach((typeTestStructure, i) => {
                    runTypeDefinitionTests(typeExpression.types[i], typeTestStructure);
                });
            }
        });
    });
}
