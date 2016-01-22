﻿import * as path from "path";
import {getFileInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

// See Issue #23
describe("multiple file definition tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/reference/main.ts");
    const fileDefs = getFileInfo([fileName]);
    const mainFileDef = fileDefs.filter(def => /main/.test(def.fileName))[0];
    const referenceFileDef = fileDefs.filter(def => /reference-structures/.test(def.fileName))[0];

    runFileDefinitionTests(mainFileDef, {
        variables: [{
            declarationType: "var",
            name: "c",
            typeExpression: { text: "MyReferenceClass" }
        }, {
            declarationType: "var",
            name: "i",
            typeExpression: { text: "MyReferenceInterface" }
        }, {
            declarationType: "var",
            name: "f",
            typeExpression: { text: "typeof MyReferenceFunction" },
            defaultExpression: { text: "MyReferenceFunction" }
        }, {
            declarationType: "var",
            name: "e",
            typeExpression: { text: "MyReferenceEnum" }
        }]
    });
    runFileDefinitionTests(referenceFileDef, {
        classes: [{
            name: "MyReferenceClass"
        }],
        interfaces: [{
            name: "MyReferenceInterface"
        }],
        enums: [{
            name: "MyReferenceEnum"
        }],
        functions: [{
            name: "MyReferenceFunction"
        }]
    });
});
