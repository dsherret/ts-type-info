import * as assert from "assert";
import {FileDefinition, ExportedDefinitions} from "./../../../../definitions";
import {Expression} from "./../../../../expressions";
import {FileStructure, ExpressionStructure, NamedStructure, ExportableStructure} from "./../../structures";
import {runImportDefinitionTests} from "./run-import-definition-tests";
import {runReExportDefinitionTests} from "./run-re-export-definition-tests";
import {runModuledDefinitionTests, runNamedDefinitionTests, runExportableDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";
import {runExpressionTests} from "./../../expressions";

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

    describe("defaultExport", () => {
        if (structure.defaultExport == null) {
            it("should not have a default export", () => {
                assert.equal(definition.defaultExport, null);
            });
        }
        else {
            ensureNotNull(definition.defaultExport, () => {
                if ((structure.defaultExport as ExpressionStructure).text != null) {
                    runExpressionTests(definition.defaultExport as Expression, structure.defaultExport as ExpressionStructure);
                }
                else {
                    const defaultExportDef = definition.defaultExport as ExportedDefinitions;
                    runNamedDefinitionTests(defaultExportDef, structure.defaultExport as NamedStructure);
                    runExportableDefinitionTests(defaultExportDef, structure.defaultExport as ExportableStructure);
                }
            });
        }
    });
}
