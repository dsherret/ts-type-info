import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function ambient tests", () => {
    const code = `
declare function getValue(str: string): number;
declare function getValue(num: number): number;

declare function setValue(str: string, nextParam: number): number;
declare function setValue(str: string, otherNum: number, finalNum: number): string;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "getValue",
            hasDeclareKeyword: true,
            isAmbient: true,
            parameters: [{
                name: "param1",
                type: {
                    text: "string | number",
                    unionTypes: [
                        { text: "string" },
                        { text: "number" }
                    ]
                }
            }],
            returnType: { text: "number" },
            overloadSignatures: [{
                parameters: [{
                    name: "str",
                    type: { text: "string" }
                }],
                returnType: { text: "number" },
                minArgumentCount: 1
            }, {
                parameters: [{
                    name: "num",
                    type: { text: "number" }
                }],
                returnType: { text: "number" },
                minArgumentCount: 1
            }]
        }, {
            name: "setValue",
            isAmbient: true,
            hasDeclareKeyword: true,
            parameters: [{
                name: "str",
                type: { text: "string" }
            }, {
                name: "param2",
                type: { text: "number" }
            }, {
                name: "finalNum",
                isOptional: true,
                type: { text: "number" }
            }],
            returnType: {
                text: "number | string",
                unionTypes: [
                    { text: "number" },
                    { text: "string" }
                ]
            },
            overloadSignatures: [{
                parameters: [{
                    name: "str",
                    type: { text: "string" }
                }, {
                    name: "nextParam",
                    type: { text: "number" }
                }],
                returnType: { text: "number" },
                minArgumentCount: 2
            }, {
                parameters: [{
                    name: "str",
                    type: { text: "string" }
                }, {
                    name: "otherNum",
                    type: { text: "number" }
                }, {
                    name: "finalNum",
                    type: { text: "number" }
                }],
                returnType: { text: "string" },
                minArgumentCount: 3
            }]
        }]
    });
});
