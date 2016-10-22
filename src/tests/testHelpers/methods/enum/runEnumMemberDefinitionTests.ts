import * as assert from "assert";
import {EnumMemberTestStructure} from "./../../testStructures";
import {EnumMemberDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runNamedDefinitionTests, runJsDocedDefinitionTests} from "./../base";

export function runEnumMemberDefinitionTests(definition: EnumMemberDefinition, structure: EnumMemberTestStructure) {
    describe(`enum member ${structure.name}`, () => {
        runBaseDefinitionTests(definition, structure);
        runNamedDefinitionTests(definition, structure);
        runJsDocedDefinitionTests(definition, structure);

        it(`should have a value of ${structure.value}`, () => {
            assert.equal(definition.value, structure.value);
        });
    });
}
