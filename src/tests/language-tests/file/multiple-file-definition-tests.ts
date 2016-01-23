import * as path from "path";
import {getFileInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";
import {VariableDeclarationType} from "./../../../definitions";

// See Issue #23
describe("multiple file definition tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/reference/main.ts");
    const fileDefs = getFileInfo([fileName]);
    const mainFileDef = fileDefs.filter(def => /main/.test(def.fileName))[0];
    const referenceFileDef = fileDefs.filter(def => /reference-structures/.test(def.fileName))[0];

    runFileDefinitionTests(mainFileDef, {
        variables: [{
            declarationType: VariableDeclarationType.Var,
            name: "c",
            typeExpression: { text: "MyReferenceClass" }
        }, {
            declarationType: VariableDeclarationType.Var,
            name: "i",
            typeExpression: { text: "MyReferenceInterface" }
        }, {
            declarationType: VariableDeclarationType.Var,
            name: "f",
            typeExpression: { text: "typeof MyReferenceFunction" },
            defaultExpression: { text: "MyReferenceFunction" }
        }, {
            declarationType: VariableDeclarationType.Var,
            name: "e",
            typeExpression: { text: "MyReferenceEnum" }
        }]
    });
    runFileDefinitionTests(referenceFileDef, {
        classes: [{
            name: "MyReferenceClass",
            isAmbient: true
        }],
        interfaces: [{
            name: "MyReferenceInterface",
            isAmbient: true
        }],
        enums: [{
            name: "MyReferenceEnum",
            isAmbient: true
        }],
        functions: [{
            name: "MyReferenceFunction",
            isAmbient: true
        }]
    });
});
