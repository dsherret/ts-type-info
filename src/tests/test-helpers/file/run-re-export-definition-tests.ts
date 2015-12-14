import * as assert from "assert";
import * as path from "path";
import {ReExport} from "./../structures";
import {ReExportDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../base";

export function runReExportDefinitionTests(definition: ReExportDefinition, reExport: ReExport) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`re-export ${reExport.definitionName}`, () => {
        runNamedDefinitionTests(definition.definition, reExport.definitionName);

        it(`should have a matching type`, () => {
            assert.equal(definition.definition instanceof reExport.definitionType, true);
        });

        it(`should have a file name that ends with ${reExport.fileName}`, () => {
            assert.equal(path.basename(definition.file.fileName), reExport.fileName);
        });
    });
}
