import * as assert from "assert";
import {BasePropertyStructure} from "./../../structures";
import {BasePropertyDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runTypeExpressionedDefinitionTests} from "./run-typed-definition-tests";
import {runParentedDefinitionTests} from "./run-parented-definition-tests";

export function runBasePropertyDefinitionTests(definition: BasePropertyDefinition<any>, structure: BasePropertyStructure) {
    runNamedDefinitionTests(definition, structure);
    runTypeExpressionedDefinitionTests(definition, structure);
    runParentedDefinitionTests(definition);

    it(`should be ${structure.isOptional ? "optional" : "not optional"}`, () => {
        assert.equal(definition.isOptional, typeof structure.isOptional === "boolean" ? structure.isOptional : false);
    });
}
