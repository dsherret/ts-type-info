import * as assert from "assert";
import {BaseParameterStructure} from "./../../../structures";
import {BaseParameterDefinition} from "./../../../../../definitions";
import {runNamedDefinitionTests, runTypeExpressionedDefinitionTests, runDefaultExpressionedDefinitionTests} from "./../../base";

export function runBaseParameterDefinitionTests(definition: BaseParameterDefinition<any>, structure: BaseParameterStructure) {
    runNamedDefinitionTests(definition, structure);
    runTypeExpressionedDefinitionTests(definition, structure);
    runDefaultExpressionedDefinitionTests(definition, structure);

    it(`should be ${structure.isOptional ? "optional" : "not optional"}`, () => {
        assert.equal(definition.isOptional, typeof structure.isOptional === "boolean" ? structure.isOptional : false);
    });

    it(`should ${structure.isRestParameter ? "be" : "not be"} a rest parameter`, () => {
        assert.equal(definition.isRestParameter, typeof structure.isRestParameter === "boolean" ? structure.isRestParameter : false);
    });
}
