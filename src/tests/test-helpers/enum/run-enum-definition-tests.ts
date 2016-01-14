import * as assert from "assert";
import {Enum} from "./../structures";
import {EnumDefinition} from "./../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests} from "./../base";
import {runEnumMemberDefinitionTests} from "./run-enum-member-definition-tests";

export function runEnumDefinitionTests(definition: EnumDefinition, structure: Enum) {
    describe(`enum ${structure.name}`, () => {
        structure.members = structure.members || [];

        runNamedDefinitionTests(definition, structure);
        runExportableDefinitionTests(definition, structure);

        it(`should have ${structure.members.length} member(s)`, () => {
            assert.equal(definition.members.length, structure.members.length);
        });

        structure.members.forEach((memberStructure, i) => {
            runEnumMemberDefinitionTests(definition.members[i], memberStructure);
        });
    });
}
