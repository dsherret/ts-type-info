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
                name: "NamedExport1",
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
                name: "default",
                alias: "DefaultExportClass",
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
                name: "NamedExportEnum",
                expression: null,
                definitions: [{
                    name: "NamedExportEnum",
                    type: EnumDefinition
                }]
            }, {
                name: "NamedExportEnum2",
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
                name: "ExportStar2Class",
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
                name: "default",
                alias: "Expression",
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
                name: "RenamedA1",
                expression: null,
                definitions: [{
                    name: "SingleNamedExportA",
                    type: ClassDefinition
                }]
            }, {
                name: "RenamedA2",
                expression: null,
                definitions: [{
                    name: "SingleNamedExportA",
                    type: ClassDefinition
                }]
            }, {
                name: "RenamedA3",
                expression: null,
                definitions: [{
                    name: "SingleNamedExportA",
                    type: ClassDefinition
                }]
            }, {
                name: "SingleNamedExportB",
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
