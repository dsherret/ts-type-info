import * as assert from "assert";
import {TypeExpression} from "./../../../expressions";
import {TypeExpressionStructure} from "./../structures";

export function runTypeExpressionTests(typeExpression: TypeExpression, structure: TypeExpressionStructure) {
    it(`should have a type of ${structure.text}`, () => {
        assert.equal(typeExpression.text, structure.text);
    });
}
