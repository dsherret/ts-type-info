import * as assert from "assert";
import * as path from "path";
import {ImportTestStructure} from "./../../test-structures";
import {ImportDefinition} from "./../../../../definitions";
import {runParentedDefinitionTests} from "./../base";

export function runImportDefinitionTests(definition: ImportDefinition, importTestStructure: ImportTestStructure) {
    describe(`import ${importTestStructure.definitionName}`, () => {
        runParentedDefinitionTests(definition);

        it(`should have the name ${importTestStructure.definitionName}`, () => {
            assert.equal(definition.definition.name, importTestStructure.definitionName);
        });

        it(`should have a matching type`, () => {
            assert.equal(definition.definition instanceof importTestStructure.definitionType, true);
        });

        it(`should have a file name that ends with ${importTestStructure.fileName}`, () => {
            assert.equal(path.basename(definition.file.fileName), importTestStructure.fileName);
        });
    });
}
