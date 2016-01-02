import * as assert from "assert";
import {TypeExpression} from "./../../../types";

export function runTypeExpressionTests(typeExpression: TypeExpression, name: string) {
    if (typeExpression == null) {
        throw "Type should not be null.";
    }

    it(`should have a type of ${name}`, () => {
        assert.equal(typeExpression.text, name);
    });
}
