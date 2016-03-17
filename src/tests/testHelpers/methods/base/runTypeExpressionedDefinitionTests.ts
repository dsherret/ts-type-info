import * as assert from "assert";
import {TypeExpressionedTestStructure} from "./../../testStructures";
import {TypeExpressionedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../expressions";

export function runTypeExpressionedDefinitionTests(definition: TypeExpressionedDefinition, structure: TypeExpressionedTestStructure) {
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
