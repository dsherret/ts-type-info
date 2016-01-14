import * as assert from "assert";
import {TypeParameterStructure} from "./../../structures";
import {TypeParameterDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./../base";
import {runTypeExpressionTests} from "./../../expressions";

export function runTypeParameterDefinitionTests(definition: TypeParameterDefinition, structure: TypeParameterStructure) {
    describe(`type parameter ${structure.name}`, () => {
        runNamedDefinitionTests(definition, structure);

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
