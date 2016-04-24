import * as assert from "assert";
import {EnumTestStructure} from "./../../testStructures";
import {EnumDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runNamedDefinitionTests, runExportableDefinitionTests, runAmbientableDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";
import {runEnumMemberDefinitionTests} from "./runEnumMemberDefinitionTests";

export function runEnumDefinitionTests(definition: EnumDefinition, structure: EnumTestStructure) {
    describe(`enum ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.members = structure.members || [];

            runBaseDefinitionTests(definition, structure);
            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);

            it(`should have ${structure.members.length} member(s)`, () => {
                assert.equal(definition.members.length, structure.members.length);
            });

            structure.members.forEach((memberTestStructure, i) => {
                runEnumMemberDefinitionTests(definition.members[i], memberTestStructure);
            });
        });
    });
}
