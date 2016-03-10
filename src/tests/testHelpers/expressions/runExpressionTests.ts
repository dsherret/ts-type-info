import * as assert from "assert";
import {Expression} from "./../../../expressions";
import {ExpressionTestStructure} from "./../testStructures";

export function runExpressionTests(expression: Expression, structure: ExpressionTestStructure) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(expression, null);
        });
    }
    else {
        it(`should have the text ${structure.text}`, () => {
            assert.equal(expression.text, structure.text);
        });
    }
}
