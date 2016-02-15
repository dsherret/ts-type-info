import * as assert from "assert";
import {DefaultExpressionedTestStructure} from "./../../test-structures";
import {IDefaultExpressionedDefinition} from "./../../../../definitions";
import {runExpressionTests} from "./../../expressions";

export function runDefaultExpressionedDefinitionTests(definition: IDefaultExpressionedDefinition, structure: DefaultExpressionedTestStructure) {
    describe("defaultExpression", () => {
        if (structure.defaultExpression != null) {
            it(`should have the default expression`, () => {
                runExpressionTests(definition.defaultExpression, structure.defaultExpression);
            });
        }
        else {
            it(`should not have a default expression.`, () => {
                assert.equal(definition.defaultExpression, null);
            });
        }
    });
}
