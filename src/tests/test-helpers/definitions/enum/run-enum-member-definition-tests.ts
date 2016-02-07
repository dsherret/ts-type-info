import * as assert from "assert";
import {EnumMemberStructure} from "./../../structures";
import {EnumMemberDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runParentedDefinitionTests} from "./../base";

export function runEnumMemberDefinitionTests(definition: EnumMemberDefinition, structure: EnumMemberStructure) {
    describe(`enum member ${structure.name}`, () => {
        runNamedDefinitionTests(definition, structure);
        runParentedDefinitionTests(definition);

        it(`should have a value of ${structure.value}`, () => {
            assert.equal(definition.value, structure.value);
        });
    });
}
