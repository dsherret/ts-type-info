import * as assert from "assert";
import {TypeExpression} from "./../../../expressions";
import {TypeExpressionTestStructure} from "./../testStructures";
import {ensureNotNull} from "./../ensureNotNull";
import {runTypeTests} from "./runTypeTests";

export function runTypeExpressionTests(typeExpression: TypeExpression, structure: TypeExpressionTestStructure) {
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
                    runTypeTests(typeExpression.types[i], typeTestStructure);
                });
            }
        });
    });
}
