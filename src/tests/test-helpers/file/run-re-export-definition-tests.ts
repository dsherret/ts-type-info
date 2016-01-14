import * as assert from "assert";
import * as path from "path";
import {ReExport} from "./../structures";
import {ReExportDefinition} from "./../../../definitions";

export function runReExportDefinitionTests(definition: ReExportDefinition, reExport: ReExport) {
    describe(`re-export ${reExport.definitionName}`, () => {
        it(`should have the name ${reExport.definitionName}`, () => {
            assert.equal(definition.definition.name, reExport.definitionName);
        });

        it(`should have a matching type`, () => {
            assert.equal(definition.definition instanceof reExport.definitionType, true);
        });

        it(`should have a file name that ends with ${reExport.fileName}`, () => {
            assert.equal(path.basename(definition.file.fileName), reExport.fileName);
        });
    });
}
