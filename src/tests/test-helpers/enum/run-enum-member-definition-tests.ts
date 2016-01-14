import * as assert from "assert";
import {EnumMember} from "./../structures";
import {EnumMemberDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../base";

export function runEnumMemberDefinitionTests(definition: EnumMemberDefinition, structure: EnumMember) {
    describe(`enum member ${structure.name}`, () => {
        runNamedDefinitionTests(definition, structure);

        it(`should have a value of ${structure.value}`, () => {
            assert.equal(definition.value, structure.value);
        });
    });
}
