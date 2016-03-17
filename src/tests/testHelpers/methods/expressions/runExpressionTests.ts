import * as assert from "assert";
import {ExpressionDefinition} from "./../../../../definitions";
import {ExpressionTestStructure} from "./../../testStructures";

export function runExpressionTests(expression: ExpressionDefinition, structure: ExpressionTestStructure) {
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
