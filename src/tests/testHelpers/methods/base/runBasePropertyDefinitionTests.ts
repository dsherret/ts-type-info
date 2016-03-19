import * as assert from "assert";
import {BasePropertyTestStructure} from "./../../testStructures";
import {BasePropertyDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./runNamedDefinitionTests";
import {runTypeExpressionedDefinitionTests} from "./runTypeExpressionedDefinitionTests";
import {runParentedDefinitionTests} from "./runParentedDefinitionTests";

export function runBasePropertyDefinitionTests(definition: BasePropertyDefinition<any>, structure: BasePropertyTestStructure) {
    runNamedDefinitionTests(definition, structure);
    runTypeExpressionedDefinitionTests(definition, structure);
    runParentedDefinitionTests(definition);

    it(`should be ${structure.isOptional ? "optional" : "not optional"}`, () => {
        assert.equal(definition.isOptional, typeof structure.isOptional === "boolean" ? structure.isOptional : false);
    });
}
