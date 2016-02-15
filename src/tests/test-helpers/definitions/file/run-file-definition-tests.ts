import * as assert from "assert";
import {FileDefinition, ExportableDefinitions} from "./../../../../definitions";
import {Expression} from "./../../../../expressions";
import {ArrayExt} from "./../../../../utils";
import {FileTestStructure, ExpressionTestStructure, NamedTestStructure, ExportableTestStructure} from "./../../test-structures";
import {runImportDefinitionTests} from "./run-import-definition-tests";
import {runReExportDefinitionTests} from "./run-re-export-definition-tests";
import {runModuledDefinitionTests, runNamedDefinitionTests, runExportableDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";
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
                if ((structure.defaultExport as ExpressionTestStructure).text != null) {
                    runExpressionTests(definition.defaultExport as Expression, structure.defaultExport as ExpressionTestStructure);
                }
                else {
                    const defaultExportDefs = definition.defaultExport as ArrayExt<ExportableDefinitions>;

                    defaultExportDefs.forEach(defaultExportDef => {
                        runNamedDefinitionTests(defaultExportDef, structure.defaultExport as NamedTestStructure);
                        runExportableDefinitionTests(defaultExportDef, structure.defaultExport as ExportableTestStructure);
                    });
                }
            });
        }
    });
}
