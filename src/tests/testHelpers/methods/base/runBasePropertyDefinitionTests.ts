import * as assert from "assert";
import {BasePropertyTestStructure} from "./../../testStructures";
import {BasePropertyDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./runNamedDefinitionTests";
import {runTypeExpressionedDefinitionTests} from "./runTypeExpressionedDefinitionTests";

export function runBasePropertyDefinitionTests(definition: BasePropertyDefinition, structure: BasePropertyTestStructure) {
    runNamedDefinitionTests(definition, structure);
    runTypeExpressionedDefinitionTests(definition, structure);

    it(`should be ${structure.isOptional ? "optional" : "not optional"}`, () => {
        assert.equal(definition.isOptional, typeof structure.isOptional === "boolean" ? structure.isOptional : false);
    });
}
