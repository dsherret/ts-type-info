import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function type tests", () => {
    const code = `
function myFunc(func: <T extends string>(str: T, num?: number) => void) {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "myFunc",
            parameters: [{
                name: "func",
                type: {
                    text: "<T extends string>(str: T, num?: number) => void",
                    typeParameters: [{
                        name: "T",
                        constraintType: { text: "string" }
                    }],
                    parameters: [{
                        name: "str",
                        type: { text: "T" }
                    }, {
                        name: "num",
                        type: { text: "number" },
                        isOptional: true
                    }],
                    callSignatures: [{
                        minArgumentCount: 1,
                        typeParameters: [{
                            name: "T",
                            constraintType: { text: "string" }
                        }],
                        parameters: [{
                            name: "str",
                            type: { text: "T" }
                        }, {
                            name: "num",
                            type: { text: "number" },
                            isOptional: true
                        }]
                    }]
                }
            }]
        }]
    });
});
