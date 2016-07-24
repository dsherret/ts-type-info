import * as path from "path";
import * as assert from "assert";
import {getInfoFromFiles} from "./../../../main";
import {runImportDefinitionTests} from "./../../testHelpers";
import {ClassDefinition, EnumDefinition, InterfaceDefinition, NamespaceDefinition, VariableDefinition} from "./../../../definitions";

describe("file import tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/languageTests/file/testFiles/import.ts");
    const fileDef = getInfoFromFiles([fileName]).getFile("import.ts");
    let i = 0;

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./defaultExport",
        fileName: "defaultExport.ts",
        defaultImport: {
            importName: "DefaultExport",
            definitions: [{
                name: "DefaultExport",
                type: ClassDefinition
            }],
            expression: null
        },
        namedImports: [],
        starImportName: null,
        starImports: []
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./defaultExportSeparate",
        fileName: "defaultExportSeparate.ts",
        defaultImport: {
            importName: "DefaultExportSeparate",
            definitions: [{
                name: "DefaultExportSeparate",
                type: ClassDefinition
            }],
            expression: null
        },
        namedImports: [],
        starImportName: null,
        starImports: []
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./namedExports",
        fileName: "namedExports.ts",
        defaultImport: null,
        namedImports: [{
            name: "NamedExport1",
            definitions: [{
                name: "NamedExport1",
                type: ClassDefinition
            }, {
                name: "NamedExport1",
                type: NamespaceDefinition
            }],
            expression: null
        }, {
            name: "NamedExport2",
            definitions: [{
                name: "NamedExport2",
                type: ClassDefinition
            }],
            expression: null
        }],
        starImportName: null,
        starImports: []
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./namedExports",
        fileName: "namedExports.ts",
        defaultImport: null,
        namedImports: [],
        starImportName: "NamedExports",
        starImports: [{
            name: "NamedExport1",
            definitions: [{
                name: "NamedExport1",
                type: ClassDefinition
            }, {
                name: "NamedExport1",
                type: NamespaceDefinition
            }],
            expression: null
        }, {
            name: "NamedExport2",
            definitions: [{
                name: "NamedExport2",
                type: ClassDefinition
            }],
            expression: null
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./namedWithDefaultExport",
        fileName: "namedWithDefaultExport.ts",
        defaultImport: {
            importName: "DefaultExportClassLocalName1",
            definitions: [{
                name: "DefaultExportClass",
                type: ClassDefinition
            }],
            expression: null
        },
        namedImports: [{
            name: "NamedExportEnum",
            alias: "NamedExportLocalName",
            definitions: [{
                name: "NamedExportEnum",
                type: EnumDefinition
            }],
            expression: null
        }],
        starImportName: null,
        starImports: []
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./namedWithDefaultExport",
        fileName: "namedWithDefaultExport.ts",
        defaultImport: {
            importName: "DefaultExportClassLocalName2",
            definitions: [{
                name: "DefaultExportClass",
                type: ClassDefinition
            }],
            expression: null
        },
        namedImports: [],
        starImportName: "NamedWithDefaultExportStarImport",
        starImports: [{
            name: "NamedExportEnum",
            definitions: [{
                name: "NamedExportEnum",
                type: EnumDefinition
            }],
            expression: null
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./expression",
        fileName: "expression.ts",
        defaultImport: {
            importName: "Expression",
            definitions: [],
            expression: { text: `"test string"` }
        },
        namedImports: [],
        starImportName: null,
        starImports: []
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./expression",
        fileName: "expression.ts",
        defaultImport: null,
        namedImports: [],
        starImportName: null,
        starImports: []
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./reExport",
        fileName: "reExport.ts",
        defaultImport: null,
        namedImports: [],
        starImportName: "reexports",
        starImports: [{
            name: "RenamedExport",
            definitions: [{
                name: "NamedExport1",
                type: ClassDefinition
            }, {
                name: "NamedExport1",
                type: NamespaceDefinition
            }],
            expression: null
        }, {
            name: "NamedExport1",
            definitions: [{
                name: "NamedExport1",
                type: ClassDefinition
            }, {
                name: "NamedExport1",
                type: NamespaceDefinition
            }],
            expression: null
        }, {
            name: "NamedExport2",
            definitions: [{
                name: "NamedExport2",
                type: ClassDefinition
            }],
            expression: null
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "definition",
        fileName: "definition.d.ts",
        defaultImport: null,
        namedImports: [],
        starImportName: "definitionLocal",
        starImports: [{
            name: "DefinitionInterface",
            definitions: [{
                name: "DefinitionInterface",
                type: InterfaceDefinition
            }],
            expression: null
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "./definitionNamespace",
        fileName: "definitionNamespace.d.ts",
        defaultImport: null,
        namedImports: [],
        starImportName: "definitionNamespace",
        starImports: [{
            name: "DefinitionNamespaceInterface",
            definitions: [{
                name: "DefinitionNamespaceInterface",
                type: InterfaceDefinition
            }],
            expression: null
        }]
    });

    runImportDefinitionTests(fileDef.imports[i++], {
        moduleSpecifier: "definition-var",
        fileName: "definition-var.d.ts",
        defaultImport: null,
        namedImports: [],
        starImportName: "definitionVar",
        starImports: [{
            name: "Methods",
            definitions: [{
                name: "Methods",
                type: VariableDefinition
            }],
            expression: null
        }]
    });

    it(`should have ${i} imports`, () => {
        assert.equal(fileDef.imports.length, i);
    });
});
