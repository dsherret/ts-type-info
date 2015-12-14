import * as path from "path";
import * as assert from "assert";
import {getFileInfo} from "./../../../main";
import {runReExportDefinitionTests} from "./../../test-helpers";
import {ClassDefinition, EnumDefinition} from "./../../../definitions";

describe("file re-export tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/re-export.ts");
    const fileDef = getFileInfo([fileName]).filter(def => /re\-export/.test(def.fileName))[0];
    const NUM_RE_EXPORTS = 2;

    it(`should have ${NUM_RE_EXPORTS} re-exports`, () => {
        assert.equal(fileDef.reExports.length, NUM_RE_EXPORTS);
    });

    runReExportDefinitionTests(fileDef.reExports[0], {
        definitionName: "TestClass",
        definitionType: ClassDefinition,
        fileName: "test-class.ts"
    });

    runReExportDefinitionTests(fileDef.reExports[1], {
        definitionName: "TestEnum",
        definitionType: EnumDefinition,
        fileName: "test-enum.ts"
    });
});
