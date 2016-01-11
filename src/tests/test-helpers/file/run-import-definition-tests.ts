import * as assert from "assert";
import * as path from "path";
import {Import} from "./../structures";
import {ImportDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../base";

export function runImportDefinitionTests(definition: ImportDefinition, importStructure: Import) {
    if (definition == null) {
        throw "Import definition should not be null.";
    }

    describe(`import ${importStructure.definitionName}`, () => {
        runNamedDefinitionTests(definition.definition, importStructure.definitionName);

        it(`should have a matching type`, () => {
            assert.equal(definition.definition instanceof importStructure.definitionType, true);
        });

        it(`should have a file name that ends with ${importStructure.fileName}`, () => {
            assert.equal(path.basename(definition.file.fileName), importStructure.fileName);
        });
    });
}
