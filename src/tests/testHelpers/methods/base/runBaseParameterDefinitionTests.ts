import * as assert from "assert";
import {BaseParameterTestStructure} from "./../../testStructures";
import {BaseParameterDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./runNamedDefinitionTests";
import {runTypeExpressionedDefinitionTests} from "./runTypeExpressionedDefinitionTests";
import {runDefaultExpressionedDefinitionTests} from "./runDefaultExpressionedDefinitionTests";
import {runParentedDefinitionTests} from "./runParentedDefinitionTests";

export function runBaseParameterDefinitionTests(definition: BaseParameterDefinition<any>, structure: BaseParameterTestStructure) {
    runNamedDefinitionTests(definition, structure);
    runTypeExpressionedDefinitionTests(definition, structure);
    runDefaultExpressionedDefinitionTests(definition, structure);
    runParentedDefinitionTests(definition);

    it(`should be ${structure.isOptional ? "optional" : "not optional"}`, () => {
        assert.equal(definition.isOptional, typeof structure.isOptional === "boolean" ? structure.isOptional : false);
    });

    it(`should ${structure.isRestParameter ? "be" : "not be"} a rest parameter`, () => {
        assert.equal(definition.isRestParameter, typeof structure.isRestParameter === "boolean" ? structure.isRestParameter : false);
    });
}
