import * as path from "path";
import {getInfoFromFiles} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

// makes sure there's only one definition for multiple overloads
describe("function type from reference tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/languageTests/file/testFiles/functionTypeFromReference/main.ts");
    const result = getInfoFromFiles([fileName]);
    const mainFileDef = result.getFile("main.ts")!;
    const referenceFileDef = result.getFile("referenceFunction.d.ts")!;

    runFileDefinitionTests(mainFileDef, {
        variables: [{
            name: "referenceFunctionVar",
            type: {
                text: "typeof ReferenceFunction",
                definitions: [{
                    name: "ReferenceFunction"
                }]
            },
            defaultExpression: { text: "ReferenceFunction" }
        }]
    });
    runFileDefinitionTests(referenceFileDef, {
        functions: [{
            name: "ReferenceFunction",
            isAmbient: true,
            hasDeclareKeyword: true,
            parameters: [{
                name: "param",
                type: {
                    text: "number | string",
                    unionTypes: [
                        { text: "number" },
                        { text: "string" }
                    ]
                }
            }],
            overloadSignatures: [{
                parameters: [{
                    name: "param",
                    type: { text: "number" }
                }],
                minArgumentCount: 1
            }, {
                parameters: [{
                    name: "param",
                    type: { text: "string" }
                }],
                minArgumentCount: 1
            }]
        }]
    });
});
