import * as assert from "assert";
import {EnumMember} from "./../structures";
import {EnumMemberDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../base";

export function runEnumMemberDefinitionTests(definition: EnumMemberDefinition, enumMember: EnumMember) {
    if (definition == null) {
        throw "Enum member definition should not be null.";
    }

    describe(`enum member ${enumMember.name}`, () => {
        runNamedDefinitionTests(definition, enumMember.name);

        it(`should have a value of ${enumMember.value}`, () => {
            assert.equal(definition.value, enumMember.value);
        });
    });
}
