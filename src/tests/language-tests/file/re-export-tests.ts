import * as path from "path";
import {getFileInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {ClassDefinition, EnumDefinition, NamespaceDefinition} from "./../../../definitions";

describe("file re-export tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/re-export-test-files/re-export.ts");
    const fileDef = getFileInfo([fileName]).firstOrDefault(def => /re\-export\.ts/.test(def.fileName));

    runFileDefinitionTests(fileDef, {
        reExports: [{
            moduleSpecifier: "./named-default-exports",
            fileName: "named-default-exports.ts",
            namedExports: [{
                exportName: "NamedExport1",
                expression: null,
                definitions: [{
                    name: "NamedExport1",
                    type: ClassDefinition
                }, {
                    name: "NamedExport1",
                    type: NamespaceDefinition
                }]
            }],
            starExports: []
        }, {
            moduleSpecifier: "./named-default-exports",
            fileName: "named-default-exports.ts",
            namedExports: [{
                exportName: "DefaultExportClass",
                expression: null,
                definitions: [{
                    name: "DefaultExport",
                    type: ClassDefinition
                }]
            }],
            starExports: []
        }, {
            moduleSpecifier: "./export-star",
            fileName: "export-star.ts",
            namedExports: [],
            starExports: [{
                exportName: "NamedExportEnum",
                expression: null,
                definitions: [{
                    name: "NamedExportEnum",
                    type: EnumDefinition
                }]
            }, {
                exportName: "NamedExportEnum2",
                expression: null,
                definitions: [{
                    name: "NamedExportEnum2",
                    type: EnumDefinition
                }]
            }]
        }, {
            moduleSpecifier: "./export-star2",
            fileName: "export-star2.ts",
            namedExports: [],
            starExports: [{
                exportName: "ExportStar2Class",
                expression: null,
                definitions: [{
                    name: "ExportStar2Class",
                    type: ClassDefinition
                }]
            }]
        }, {
            moduleSpecifier: "./expression",
            fileName: "expression.ts",
            namedExports: [{
                exportName: "Expression",
                expression: {
                    text: "5"
                },
                definitions: []
            }],
            starExports: []
        }, {
            moduleSpecifier: "./re-export-combined",
            fileName: "re-export-combined.ts",
            namedExports: [],
            starExports: [{
                exportName: "RenamedA1",
                expression: null,
                definitions: [{
                    name: "SingleNamedExportA",
                    type: ClassDefinition
                }]
            }, {
                exportName: "RenamedA2",
                expression: null,
                definitions: [{
                    name: "SingleNamedExportA",
                    type: ClassDefinition
                }]
            }, {
                exportName: "RenamedA3",
                expression: null,
                definitions: [{
                    name: "SingleNamedExportA",
                    type: ClassDefinition
                }]
            }, {
                exportName: "SingleNamedExportB",
                expression: null,
                definitions: [{
                    name: "SingleNamedExportB",
                    type: ClassDefinition
                }]
            }]
        }],
        exports: [{
            name: "NamedExport1"
        }, {
            name: "NamedExport1"
        }, {
            name: "DefaultExport",
            isNamedExportOfFile: false,
            isDefaultExportOfFile: true
        }, {
            name: "NamedExportEnum"
        }, {
            name: "NamedExportEnum2"
        }, {
            name: "ExportStar2Class"
        }, {
            name: "SingleNamedExportA"
        }, {
            name: "SingleNamedExportA"
        }, {
            name: "SingleNamedExportA"
        }, {
            name: "SingleNamedExportB"
        }]
    });
});
