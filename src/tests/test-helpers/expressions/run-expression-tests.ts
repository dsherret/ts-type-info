import * as assert from "assert";
import {Expression} from "./../../../expressions";
import {ExpressionTestStructure} from "./../test-structures";

export function runExpressionTests(expression: Expression, structure: ExpressionTestStructure) {
    it(`should have the text ${structure.text}`, () => {
        assert.equal(expression.text, structure.text);
    });
}
