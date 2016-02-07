import * as assert from "assert";
import {BaseParameterStructure} from "./../../structures";
import {BaseParameterDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runTypeExpressionedDefinitionTests} from "./run-type-expressioned-definition-tests";
import {runDefaultExpressionedDefinitionTests} from "./run-default-expressioned-definition-tests";
import {runParentedDefinitionTests} from "./run-parented-definition-tests";

export function runBaseParameterDefinitionTests(definition: BaseParameterDefinition<any>, structure: BaseParameterStructure) {
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
