import * as assert from "assert";
import {EnumTestStructure} from "./../../testStructures";
import {EnumDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runNamedDefinitionTests, runExportableDefinitionTests, runAmbientableDefinitionTests, runOrderableDefinitionTests} from "./../base";
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
            runOrderableDefinitionTests(definition, structure);

            it(`should ${structure.isConst ? "be" : "not be"} a const enum`, () => {
                assert.equal(definition.isConst, structure.isConst || false);
            });

            it(`should have ${structure.members.length} member(s)`, () => {
                assert.equal(definition.members.length, structure.members!.length);
            });

            structure.members.forEach((memberTestStructure, i) => {
                runEnumMemberDefinitionTests(definition.members[i], memberTestStructure);
            });
        });
    });
}
