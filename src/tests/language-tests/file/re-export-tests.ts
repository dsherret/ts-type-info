import * as path from "path";
import {getFileInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {ClassDefinition, EnumDefinition} from "./../../../definitions";

describe("file re-export tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/re-export.ts");
    const fileDef = getFileInfo([fileName]).filter(def => /re\-export/.test(def.fileName))[0];

    runFileDefinitionTests(fileDef, {
        reExports: [{
            definitionName: "TestClass",
            definitionType: ClassDefinition,
            fileName: "test-class.ts"
        }, {
            definitionName: "TestEnum",
            definitionType: EnumDefinition,
            fileName: "test-enum.ts"
        }],
        exports: [{
            name: "TestClass",
            hasExportKeyword: true,
            isExported: true
        }, {
            name: "TestEnum",
            hasExportKeyword: true,
            isExported: true
        }]
    });
});
