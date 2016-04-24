import * as assert from "assert";
import {NamespaceDefinition} from "./../../../../definitions";
import {NamespaceTestStructure} from "./../../testStructures";
import {runBaseDefinitionTests, runNamedDefinitionTests, runExportableDefinitionTests, runModuledDefinitionTests, runAmbientableDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runNamespaceDefinitionTests(definition: NamespaceDefinition, structure: NamespaceTestStructure) {
    describe(`namespace ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runBaseDefinitionTests(definition, structure);
            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runModuledDefinitionTests(definition, structure);

            it(`should have declaration type ${structure.declarationType}`, () => {
                assert.equal(definition.declarationType, structure.declarationType);
            });
        });
    });
}
