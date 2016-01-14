import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("function type tests", () => {
    const code = `
function myFunc(func: <T extends string>(str: T, num?: number) => void) {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "myFunc",
            parameters: [{
                name: "func",
                typeExpression: {
                    text: "<T extends string>(str: T, num?: number) => void",
                    types: [{
                        text: "<T extends string>(str: T, num?: number) => void",
                        callSignatures: [{
                            minArgumentCount: 1,
                            typeParameters: [{
                                name: "T",
                                constraintTypeExpression: { text: "string" }
                            }],
                            parameters: [{
                                name: "str",
                                typeExpression: { text: "T" }
                            }, {
                                name: "num",
                                typeExpression: { text: "number" },
                                isOptional: true
                            }]
                        }]
                    }]
                }
            }]
        }]
    });
});
