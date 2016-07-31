import * as path from "path";
import {getInfoFromFiles} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
import {ClassDefinition, EnumDefinition, NamespaceDefinition} from "./../../../definitions";

describe("file re-export tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/languageTests/file/reExportTestFiles/reExport.ts");
    const fileDef = getInfoFromFiles([fileName]).getFile("reExport.ts")!;

    runFileDefinitionTests(fileDef, {
        reExports: [{
            moduleSpecifier: "./namedDefaultExports",
            fileName: "namedDefaultExports.ts",
            namedExports: [{
                name: "NamedExport1",
                definitions: [{
                    name: "NamedExport1",
                    type: ClassDefinition
                }, {
                    name: "NamedExport1",
                    type: NamespaceDefinition
                }]
            }]
        }, {
            moduleSpecifier: "./namedDefaultExports",
            fileName: "namedDefaultExports.ts",
            namedExports: [{
                name: "default",
                alias: "DefaultExportClass",
                definitions: [{
                    name: "DefaultExport",
                    type: ClassDefinition
                }]
            }]
        }, {
            moduleSpecifier: "./exportStar",
            fileName: "exportStar.ts",
            starExports: [{
                name: "NamedExportEnum",
                definitions: [{
                    name: "NamedExportEnum",
                    type: EnumDefinition
                }]
            }, {
                name: "NamedExportEnum2",
                definitions: [{
                    name: "NamedExportEnum2",
                    type: EnumDefinition
                }]
            }]
        }, {
            moduleSpecifier: "./exportStar2",
            fileName: "exportStar2.ts",
            starExports: [{
                name: "ExportStar2Class",
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
                }
            }]
        }, {
            moduleSpecifier: "./reExportCombined",
            fileName: "reExportCombined.ts",
            starExports: [{
                name: "RenamedA1",
                definitions: [{
                    name: "SingleNamedExportA",
                    type: ClassDefinition
                }]
            }, {
                name: "RenamedA2",
                definitions: [{
                    name: "SingleNamedExportA",
                    type: ClassDefinition
                }]
            }, {
                name: "RenamedA3",
                definitions: [{
                    name: "SingleNamedExportA",
                    type: ClassDefinition
                }]
            }, {
                name: "SingleNamedExportB",
                definitions: [{
                    name: "SingleNamedExportB",
                    type: ClassDefinition
                }]
            }, {
                name: "NamedExpression",
                expression: { text: "5" }
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
            name: "SingleNamedExportB"
        }]
    });
});
