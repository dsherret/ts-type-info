import * as assert from "assert";
import {TypeParameterTestStructure} from "./../../testStructures";
import {TypeParameterDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./../base";
import {runTypeExpressionDefinitionTests} from "./../expressions";

export function runTypeParameterDefinitionTests(definition: TypeParameterDefinition, structure: TypeParameterTestStructure) {
    describe(`type parameter ${structure.name}`, () => {
        runNamedDefinitionTests(definition, structure);

        describe("constraint", () => {
            if (structure.constraintTypeExpression == null) {
                it("should not have a constraintTypeExpression", () => {
                    assert.equal(definition.constraintTypeExpression, null);
                });
            }
            else {
                runTypeExpressionDefinitionTests(definition.constraintTypeExpression, structure.constraintTypeExpression);
            }
        });
    });
}
