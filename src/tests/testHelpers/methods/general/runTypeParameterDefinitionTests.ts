import * as assert from "assert";
import {TypeParameterTestStructure} from "./../../testStructures";
import {TypeParameterDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runNamedDefinitionTests} from "./../base";
import {runTypeExpressionDefinitionTests} from "./../expressions";
import {ensureNotNull} from "./../../ensureNotNull";

export function runTypeParameterDefinitionTests(definition: TypeParameterDefinition, structure: TypeParameterTestStructure) {
    describe(`type parameter ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseDefinitionTests(definition, structure);
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
    });
}
