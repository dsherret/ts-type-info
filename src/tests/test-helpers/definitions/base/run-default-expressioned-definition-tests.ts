import * as assert from "assert";
import {DefaultExpressionedStructure} from "./../../structures";
import {IDefaultExpressionedDefinition} from "./../../../../definitions";
import {runExpressionTests} from "./../../expressions";

export function runDefaultExpressionedDefinitionTests(definition: IDefaultExpressionedDefinition, structure: DefaultExpressionedStructure) {
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
