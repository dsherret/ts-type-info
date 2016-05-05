import * as path from "path";
import {getInfoFromFiles} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
import {ClassDefinition, EnumDefinition, NamespaceDefinition} from "./../../../definitions";

describe("file re-export tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/languageTests/file/reExportTestFiles/reExport.ts");
    const fileDef = getInfoFromFiles([fileName]).getFile("reExport.ts");

    runFileDefinitionTests(fileDef, {
        reExports: [{
            moduleSpecifier: "./namedDefaultExports",
            fileName: "namedDefaultExports.ts",
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
            moduleSpecifier: "./namedDefaultExports",
            fileName: "namedDefaultExports.ts",
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
            moduleSpecifier: "./exportStar",
            fileName: "exportStar.ts",
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
            moduleSpecifier: "./exportStar2",
            fileName: "exportStar2.ts",
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
            moduleSpecifier: "./reExportCombined",
            fileName: "reExportCombined.ts",
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
