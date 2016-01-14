import * as assert from "assert";
import * as path from "path";
import {ImportStructure} from "./../structures";
import {ImportDefinition} from "./../../../definitions";

export function runImportDefinitionTests(definition: ImportDefinition, importStructure: ImportStructure) {
    describe(`import ${importStructure.definitionName}`, () => {
        it(`should have the name ${importStructure.definitionName}`, () => {
            assert.equal(definition.definition.name, importStructure.definitionName);
        });

        it(`should have a matching type`, () => {
            assert.equal(definition.definition instanceof importStructure.definitionType, true);
        });

        it(`should have a file name that ends with ${importStructure.fileName}`, () => {
            assert.equal(path.basename(definition.file.fileName), importStructure.fileName);
        });
    });
}
