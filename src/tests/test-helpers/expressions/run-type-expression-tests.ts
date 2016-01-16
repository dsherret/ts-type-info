import * as assert from "assert";
import {TypeExpression} from "./../../../expressions";
import {TypeExpressionStructure} from "./../structures";
import {runTypeTests} from "./run-type-tests";

export function runTypeExpressionTests(typeExpression: TypeExpression, structure: TypeExpressionStructure) {
    describe("type expression", () => {
        it(`should have a type text of ${structure.text}`, () => {
            assert.equal(typeExpression.text, structure.text);
        });

        // only bother checking these types if they are explictly asked to be checked for
        if (structure.types != null) {
            it("should have the same number of types", () => {
                assert.equal(typeExpression.types.length, structure.types.length);
            });

            structure.types.forEach((typeStructure, i) => {
                runTypeTests(typeExpression.types[i], typeStructure);
            });
        }
    });
}
