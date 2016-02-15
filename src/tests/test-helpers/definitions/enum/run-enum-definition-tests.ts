import * as assert from "assert";
import {EnumTestStructure} from "./../../test-structures";
import {EnumDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runAmbientableDefinitionTests, runParentedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";
import {runEnumMemberDefinitionTests} from "./run-enum-member-definition-tests";

export function runEnumDefinitionTests(definition: EnumDefinition, structure: EnumTestStructure) {
    describe(`enum ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.members = structure.members || [];

            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runParentedDefinitionTests(definition);

            it(`should have ${structure.members.length} member(s)`, () => {
                assert.equal(definition.members.length, structure.members.length);
            });

            structure.members.forEach((memberTestStructure, i) => {
                runEnumMemberDefinitionTests(definition.members[i], memberTestStructure);
            });
        });
    });
}
