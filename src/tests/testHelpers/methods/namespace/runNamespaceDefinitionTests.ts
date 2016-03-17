import * as assert from "assert";
import {NamespaceDefinition} from "./../../../../definitions";
import {NamespaceTestStructure} from "./../../testStructures";
import {runNamedDefinitionTests, runExportableDefinitionTests, runModuledDefinitionTests, runAmbientableDefinitionTests, runParentedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";

export function runNamespaceDefinitionTests(definition: NamespaceDefinition, structure: NamespaceTestStructure) {
    describe(`namespace ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runModuledDefinitionTests(definition, structure);
            runParentedDefinitionTests(definition);

            it(`should have declaration type ${structure.declarationType}`, () => {
                assert.equal(definition.declarationType, structure.declarationType);
            });
        });
    });
}
