import * as assert from "assert";
import {FileDefinition} from "./../../../definitions";
import {FileStructure} from "./../structures";
import {runImportDefinitionTests} from "./run-import-definition-tests";
import {runReExportDefinitionTests} from "./run-re-export-definition-tests";
import {runModuledDefinitionTests} from "./../base";

export function runFileDefinitionTests(definition: FileDefinition, structure: FileStructure) {
    structure.imports = structure.imports || [];
    structure.reExports = structure.reExports || [];

    runModuledDefinitionTests(definition, structure);

    describe("imports", () => {
        it("should have the expected number of imports", () => {
            assert.equal(definition.imports.length, structure.imports.length);
        });

        structure.imports.forEach((importStructure, i) => {
            runImportDefinitionTests(definition.imports[i], importStructure);
        });
    });

    describe("reExports", () => {
        it("should have the expected number of reExports", () => {
            assert.equal(definition.reExports.length, structure.reExports.length);
        });

        structure.reExports.forEach((reExportStructure, i) => {
            runReExportDefinitionTests(definition.reExports[i], reExportStructure);
        });
    });
}
