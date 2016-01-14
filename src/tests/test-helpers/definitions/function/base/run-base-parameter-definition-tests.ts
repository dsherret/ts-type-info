import * as assert from "assert";
import {BaseParameterStructure} from "./../../../structures";
import {BaseParameterDefinition} from "./../../../../../definitions";
import {runNamedDefinitionTests, runTypeExpressionedDefinitionTests} from "./../../base";
import {runExpressionTests} from "./../../../expressions";

export function runBaseParameterDefinitionTests(definition: BaseParameterDefinition, structure: BaseParameterStructure) {
    runNamedDefinitionTests(definition, structure);
    runTypeExpressionedDefinitionTests(definition, structure);

    it(`should be ${structure.isOptional ? "optional" : "not optional"}`, () => {
        assert.equal(definition.isOptional, typeof structure.isOptional === "boolean" ? structure.isOptional : false);
    });

    it(`should ${structure.isRestParameter ? "be" : "not be"} a rest parameter`, () => {
        assert.equal(definition.isRestParameter, typeof structure.isRestParameter === "boolean" ? structure.isRestParameter : false);
    });

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
}
