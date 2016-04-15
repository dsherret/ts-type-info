import * as assert from "assert";
import {ReExportPartTestStructure} from "./../../testStructures";
import {ReExportPartDefinition} from "./../../../../definitions";
import {ensureNotNull} from "./../../ensureNotNull";
import {runBaseImportPartDefinitionTests} from "./runBaseImportPartDefinitionTests";

export function runReExportPartDefinitionTests(definition: ReExportPartDefinition, structure: ReExportPartTestStructure) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(definition, null);
        });
    }
    else {
        ensureNotNull(definition, () => {
            it(`should have export name ${structure.exportName}`, () => {
                assert.equal(definition.exportName, structure.exportName);
            });

            runBaseImportPartDefinitionTests(definition, structure);
        });
    }
}
