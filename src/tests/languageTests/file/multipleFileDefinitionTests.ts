import * as path from "path";
import {getInfoFromFiles} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

// See Issue #23
describe("multiple file definition tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/languageTests/file/testFiles/reference/main.ts");
    const result = getInfoFromFiles([fileName]);
    const mainFileDef = result.getFile("main.ts")!;
    const referenceFileDef = result.getFile("referenceStructures.d.ts")!;

    runFileDefinitionTests(mainFileDef, {
        variables: [{
            name: "c",
            type: { text: "MyReferenceClass" }
        }, {
            name: "i",
            type: { text: "MyReferenceInterface" }
        }, {
            name: "f",
            type: { text: "typeof MyReferenceFunction" },
            defaultExpression: { text: "MyReferenceFunction" }
        }, {
            name: "e",
            type: { text: "MyReferenceEnum" }
        }, {
            name: "t",
            type: { text: "MyReferenceType" }
        }]
    });
    runFileDefinitionTests(referenceFileDef, {
        classes: [{
            name: "MyReferenceClass",
            isAmbient: true,
            hasDeclareKeyword: true
        }],
        interfaces: [{
            name: "MyReferenceInterface",
            isAmbient: true,
            hasDeclareKeyword: true
        }],
        enums: [{
            name: "MyReferenceEnum",
            isAmbient: true,
            hasDeclareKeyword: true
        }],
        functions: [{
            name: "MyReferenceFunction",
            isAmbient: true,
            hasDeclareKeyword: true
        }],
        typeAliases: [{
            name: "MyReferenceType",
            isAmbient: true,
            hasDeclareKeyword: true,
            type: {
                text: "{ prop: string; }"
            }
        }]
    });
});
