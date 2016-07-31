import * as path from "path";
import * as assert from "assert";
import {getInfoFromFiles} from "./../../../main";
import {runImportDefinitionTests} from "./../../testHelpers";
import {ClassDefinition, EnumDefinition, InterfaceDefinition, NamespaceDefinition, VariableDefinition} from "./../../../definitions";

describe("file import tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/languageTests/file/testFiles/import.ts");
    const fileDef = getInfoFromFiles([fileName]).getFile("import.ts")!;
    let i = 0;

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./defaultExport",
        fileName: "defaultExport.ts",
        defaultImport: {
            name: "DefaultExport",
            definitions: [{
                name: "DefaultExport",
                type: ClassDefinition
            }]
        }
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./defaultExportSeparate",
        fileName: "defaultExportSeparate.ts",
        defaultImport: {
            name: "DefaultExportSeparate",
            definitions: [{
                name: "DefaultExportSeparate",
                type: ClassDefinition
            }]
        }
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./namedExports",
        fileName: "namedExports.ts",
        namedImports: [{
            name: "NamedExport1",
            definitions: [{
                name: "NamedExport1",
                type: ClassDefinition
            }, {
                name: "NamedExport1",
                type: NamespaceDefinition
            }]
        }, {
            name: "NamedExport2",
            definitions: [{
                name: "NamedExport2",
                type: ClassDefinition
            }]
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./namedExports",
        fileName: "namedExports.ts",
        starImportName: "NamedExports",
        starImports: [{
            name: "NamedExport1",
            definitions: [{
                name: "NamedExport1",
                type: ClassDefinition
            }, {
                name: "NamedExport1",
                type: NamespaceDefinition
            }]
        }, {
            name: "NamedExport2",
            definitions: [{
                name: "NamedExport2",
                type: ClassDefinition
            }]
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./namedWithDefaultExport",
        fileName: "namedWithDefaultExport.ts",
        defaultImport: {
            name: "DefaultExportClassLocalName1",
            definitions: [{
                name: "DefaultExportClass",
                type: ClassDefinition
            }]
        },
        namedImports: [{
            name: "NamedExportEnum",
            alias: "NamedExportLocalName",
            definitions: [{
                name: "NamedExportEnum",
                type: EnumDefinition
            }]
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./namedWithDefaultExport",
        fileName: "namedWithDefaultExport.ts",
        defaultImport: {
            name: "DefaultExportClassLocalName2",
            definitions: [{
                name: "DefaultExportClass",
                type: ClassDefinition
            }]
        },
        starImportName: "NamedWithDefaultExportStarImport",
        starImports: [{
            name: "NamedExportEnum",
            definitions: [{
                name: "NamedExportEnum",
                type: EnumDefinition
            }]
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./expression",
        fileName: "expression.ts",
        defaultImport: {
            name: "Expression",
            expression: { text: `"test string"` }
        }
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./expression",
        fileName: "expression.ts"
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./reExport",
        fileName: "reExport.ts",
        starImportName: "reexports",
        starImports: [{
            name: "RenamedExport",
            definitions: [{
                name: "NamedExport1",
                type: ClassDefinition
            }, {
                name: "NamedExport1",
                type: NamespaceDefinition
            }]
        }, {
            name: "NamedExport1",
            definitions: [{
                name: "NamedExport1",
                type: ClassDefinition
            }, {
                name: "NamedExport1",
                type: NamespaceDefinition
            }]
        }, {
            name: "NamedExport2",
            definitions: [{
                name: "NamedExport2",
                type: ClassDefinition
            }]
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "definition",
        fileName: "definition.d.ts",
        starImportName: "definitionLocal",
        starImports: [{
            name: "DefinitionInterface",
            definitions: [{
                name: "DefinitionInterface",
                type: InterfaceDefinition
            }]
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./definitionNamespace",
        fileName: "definitionNamespace.d.ts",
        starImportName: "definitionNamespace",
        starImports: [{
            name: "DefinitionNamespaceInterface",
            definitions: [{
                name: "DefinitionNamespaceInterface",
                type: InterfaceDefinition
            }]
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "definition-var",
        fileName: "definition-var.d.ts",
        starImportName: "definitionVar",
        starImports: [{
            name: "Methods",
            definitions: [{
                name: "Methods",
                type: VariableDefinition
            }]
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./namedExpression",
        fileName: "namedExpression.ts",
        starImportName: "NamedExpressions",
        starImports: [{
            name: "NamedExpression",
            expression: { text: `"test string"` }
        }]
    });

    it(`should have ${i} imports`, () => {
        assert.equal(fileDef.imports.length, i);
    });
});
