import * as assert from "assert";
import {Enum} from "./../structures";
import {EnumDefinition} from "./../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests} from "./../base";
import {runEnumMemberDefinitionTests} from "./run-enum-member-definition-tests";

export function runEnumDefinitionTests(definition: EnumDefinition, enumDef: Enum) {
    if (definition == null) {
        throw "Enum definition should not be null.";
    }

    describe(`enum ${enumDef.name}`, () => {
        runNamedDefinitionTests(definition, enumDef.name);
        runExportableDefinitionTests(definition, enumDef.isExported);

        it(`should have ${enumDef.members.length} member(s)`, () => {
            assert.equal(definition.members.length, enumDef.members.length);
        });

        definition.members.forEach((member, i) => {
            runEnumMemberDefinitionTests(member, enumDef.members[i]);
        });
    });
}
