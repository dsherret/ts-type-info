import * as assert from "assert";
import {TypeParameterTestStructure} from "./../../testStructures";
import {TypeParameterDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runParentedDefinitionTests} from "./../base";
import {runTypeExpressionTests} from "./../expressions";

export function runTypeParameterDefinitionTests(definition: TypeParameterDefinition<any>, structure: TypeParameterTestStructure) {
    describe(`type parameter ${structure.name}`, () => {
        runNamedDefinitionTests(definition, structure);
        runParentedDefinitionTests(definition);

        describe("constraint", () => {
            if (structure.constraintTypeExpression == null) {
                it("should not have a constraintTypeExpression", () => {
                    assert.equal(definition.constraintTypeExpression, null);
                });
            }
            else {
                runTypeExpressionTests(definition.constraintTypeExpression, structure.constraintTypeExpression);
            }
        });
    });
}
