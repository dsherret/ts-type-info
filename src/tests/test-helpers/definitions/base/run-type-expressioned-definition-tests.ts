import * as assert from "assert";
import {TypeExpressionedStructure} from "./../../structures";
import {ITypeExpressionedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../../expressions";

export function runTypeExpressionedDefinitionTests(definition: ITypeExpressionedDefinition, structure: TypeExpressionedStructure) {
    describe("typeExpression", () => {
        if (structure.typeExpression == null) {
            it("should not have a type expression", () => {
                assert.equal(definition.typeExpression, null);
            });
        }
        else {
            runTypeExpressionTests(definition.typeExpression, structure.typeExpression);
        }
    });
}
