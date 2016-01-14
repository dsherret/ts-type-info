import * as assert from "assert";
import {Expression} from "./../../../expressions";
import {ExpressionStructure} from "./../structures";

export function runExpressionTests(expression: Expression, structure: ExpressionStructure) {
    it(`should have the text ${structure.text}`, () => {
        assert.equal(expression.text, structure.text);
    });
}
