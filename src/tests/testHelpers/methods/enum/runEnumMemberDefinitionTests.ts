import * as assert from "assert";
import {EnumMemberTestStructure} from "./../../testStructures";
import {EnumMemberDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runNamedDefinitionTests, runDocumentationedDefinitionTests} from "./../base";

export function runEnumMemberDefinitionTests(definition: EnumMemberDefinition, structure: EnumMemberTestStructure) {
    describe(`enum member ${structure.name}`, () => {
        runBaseDefinitionTests(definition, structure);
        runNamedDefinitionTests(definition, structure);
        runDocumentationedDefinitionTests(definition, structure);

        it(`should have a value of ${structure.value}`, () => {
            assert.equal(definition.value, structure.value);
        });
    });
}
