import * as path from "path";
import * as assert from "assert";
import {getFileInfo} from "./../../../main";
import {runImportDefinitionTests} from "./../../test-helpers";
import {ClassDefinition, EnumDefinition, InterfaceDefinition, VariableDefinition, ImportType} from "./../../../definitions";

describe("file import tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/import.ts");
    const fileDef = getFileInfo([fileName]).filter(def => /import/.test(def.fileName))[0];
    const NUM_IMPORTS = 12;

    it(`should have ${NUM_IMPORTS} imports`, () => {
        assert.equal(fileDef.imports.length, NUM_IMPORTS);
    });

    runImportDefinitionTests(fileDef.imports[0], {
        name: "TestClassModule",
        importType: ImportType.Namespace,
        definitionName: "TestClass",
        definitionType: ClassDefinition,
        moduleSpecifier: "./test-class"
    });

    runImportDefinitionTests(fileDef.imports[1], {
        name: "TestEnum",
        importType: ImportType.Named,
        definitionName: "TestEnum",
        definitionType: EnumDefinition,
        moduleSpecifier: "./test-enum"
    });

    runImportDefinitionTests(fileDef.imports[2], {
        name: "Class1",
        importType: ImportType.Named,
        definitionName: "Class1",
        definitionType: ClassDefinition,
        moduleSpecifier: "./test-multiple-classes"
    });

    runImportDefinitionTests(fileDef.imports[3], {
        name: "AliasedClass",
        importType: ImportType.Named,
        definitionName: "Class2",
        definitionType: ClassDefinition,
        moduleSpecifier: "./test-multiple-classes"
    });

    runImportDefinitionTests(fileDef.imports[4], {
        name: "TestDefaultClassAsImported",
        importType: ImportType.Default,
        definitionName: "TestDefaultClass",
        definitionType: ClassDefinition,
        moduleSpecifier: "./test-default-class"
    });

    runImportDefinitionTests(fileDef.imports[5], {
        name: "TestDefaultSeparateClassAsImported",
        importType: ImportType.Default,
        definitionName: "TestDefaultSeparateClass",
        definitionType: ClassDefinition,
        moduleSpecifier: "./test-default-separate-class"
    });

    runImportDefinitionTests(fileDef.imports[6], {
        name: "definition",
        importType: ImportType.Namespace,
        definitionName: "Test",
        definitionType: InterfaceDefinition,
        moduleSpecifier: "definition"
    });

    runImportDefinitionTests(fileDef.imports[7], {
        name: "reexports",
        importType: ImportType.Namespace,
        definitionName: "TestClass",
        definitionType: ClassDefinition,
        moduleSpecifier: "./re-export"
    });

    runImportDefinitionTests(fileDef.imports[8], {
        name: "reexports",
        importType: ImportType.Namespace,
        definitionName: "TestEnum",
        definitionType: EnumDefinition,
        moduleSpecifier: "./re-export"
    });

    runImportDefinitionTests(fileDef.imports[9], {
        name: "MyInterface",
        importType: ImportType.Named,
        definitionName: "MyInterface",
        definitionType: InterfaceDefinition,
        moduleSpecifier: "./test-interface"
    });

    runImportDefinitionTests(fileDef.imports[10], {
        name: "definitionNamespace",
        importType: ImportType.Namespace,
        definitionName: "Test",
        definitionType: InterfaceDefinition,
        moduleSpecifier: "./definition-namespace"
    });

    runImportDefinitionTests(fileDef.imports[11], {
        name: "definitionVar",
        importType: ImportType.Namespace,
        definitionName: "METHODS",
        definitionType: VariableDefinition,
        moduleSpecifier: "definition-var"
    });
});
