import * as assert from "assert";
import {FileDefinition} from "./../../../../definitions";
import {FileTestStructure} from "./../../testStructures";
import {runImportDefinitionTests} from "./runImportDefinitionTests";
import {runReExportDefinitionTests} from "./runReExportDefinitionTests";
import {runModuledDefinitionTests, runNamedDefinitionTests, runExportableDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";
import {runExpressionTests} from "./../../expressions";

export function runFileDefinitionTests(definition: FileDefinition, structure: FileTestStructure) {
    structure.imports = structure.imports || [];
    structure.reExports = structure.reExports || [];
    structure.exports = structure.exports || [];

    // all exports of a file will be named
    structure.exports.forEach(exportTestStructure => {
        exportTestStructure.isNamedExportOfFile = exportTestStructure.isNamedExportOfFile == null ? true : exportTestStructure.isNamedExportOfFile;
    });

    runModuledDefinitionTests(definition, structure);

    describe("imports", () => {
        it("should have the expected number of imports", () => {
            assert.equal(definition.imports.length, structure.imports.length);
        });

        structure.imports.forEach((importTestStructure, i) => {
            runImportDefinitionTests(definition.imports[i], importTestStructure);
        });
    });

    describe("reExports", () => {
        it("should have the expected number of reExports", () => {
            assert.equal(definition.reExports.length, structure.reExports.length);
        });

        structure.reExports.forEach((reExportTestStructure, i) => {
            runReExportDefinitionTests(definition.reExports[i], reExportTestStructure);
        });
    });

    describe("defaultExport", () => {
        if (structure.defaultExport == null) {
            it("should not have a default export", () => {
                assert.equal(definition.defaultExport, null);
            });
        }
        else {
            ensureNotNull(definition.defaultExport, () => {
                runExpressionTests(definition.defaultExport.expression, structure.defaultExport.expression);

                it(`should have the same number of definitions`, () => {
                    assert.equal(definition.defaultExport.definitions.length, structure.defaultExport.definitions.length);
                });

                structure.defaultExport.definitions.forEach((defaultExportStructure, i) => {
                    runNamedDefinitionTests(definition.defaultExport.definitions[i], defaultExportStructure);
                    runExportableDefinitionTests(definition.defaultExport.definitions[i], defaultExportStructure);
                });
            });
        }
    });
}
