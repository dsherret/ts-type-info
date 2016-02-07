import * as assert from "assert";
import {EnumStructure} from "./../../structures";
import {EnumDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runAmbientableDefinitionTests, runParentedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";
import {runEnumMemberDefinitionTests} from "./run-enum-member-definition-tests";

export function runEnumDefinitionTests(definition: EnumDefinition, structure: EnumStructure) {
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

            structure.members.forEach((memberStructure, i) => {
                runEnumMemberDefinitionTests(definition.members[i], memberStructure);
            });
        });
    });
}
