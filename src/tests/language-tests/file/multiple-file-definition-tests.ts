import * as path from "path";
import * as assert from "assert";
import {getFileInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

// See Issue #23
describe("multiple file definition tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/reference/main.ts");
    const fileDefs = getFileInfo([fileName]);
    const mainFileDef = fileDefs.filter(def => /main/.test(def.fileName))[0];
    const referenceFileDef = fileDefs.filter(def => /reference-structures/.test(def.fileName))[0];

    it("should have no classes from the other file", () => {
        assert.equal(mainFileDef.classes.length, 0);
    });

    it("should have no interfaces from the other file", () => {
        assert.equal(mainFileDef.interfaces.length, 0);
    });

    it("should have no enums from the other file", () => {
        assert.equal(mainFileDef.enums.length, 0);
    });

    it("should have no functions from the other file", () => {
        assert.equal(mainFileDef.functions.length, 0);
    });

    runNamedDefinitionTests(referenceFileDef.classes[0], "MyReferenceClass");
    runNamedDefinitionTests(referenceFileDef.interfaces[0], "MyReferenceInterface");
    runNamedDefinitionTests(referenceFileDef.enums[0], "MyReferenceEnum");
    runNamedDefinitionTests(referenceFileDef.functions[0], "MyReferenceFunction");
});
