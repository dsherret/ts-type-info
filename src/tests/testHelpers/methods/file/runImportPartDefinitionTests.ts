import * as assert from "assert";
import {ImportPartTestStructure} from "./../../testStructures";
import {ImportPartDefinition} from "./../../../../definitions";
import {ensureNotNull} from "./../../ensureNotNull";
import {runBaseImportPartDefinitionTests} from "./runBaseImportPartDefinitionTests";

export function runImportPartDefinitionTests(definition: ImportPartDefinition, structure: ImportPartTestStructure) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(definition, null);
        });
    }
    else {
        ensureNotNull(definition, () => {
            it(`should have import name ${structure.importName}`, () => {
                assert.equal(definition.importName, structure.importName);
            });

            runBaseImportPartDefinitionTests(definition, structure);
        });
    }
}
