import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function overload signature tests", () => {
    const code = `
function myFunction<T>(num: number, t: T): number;
function myFunction<T>(str: string, t: T): string;
function myFunction<T>(myStringOrNumber: string | number, t: T): string {
    return "str";
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "myFunction",
            overloadSignatures: [{
                parameters: [{
                    name: "num",
                    type: { text: "number" }
                }, {
                    name: "t",
                    type: { text: "T" }
                }],
                typeParameters: [{
                    name: "T"
                }],
                returnType: { text: "number" },
                minArgumentCount: 2
            }, {
                parameters: [{
                    name: "str",
                    type: { text: "string" }
                }, {
                    name: "t",
                    type: { text: "T" }
                }],
                typeParameters: [{
                    name: "T"
                }],
                returnType: { text: "string" },
                minArgumentCount: 2
            }],
            parameters: [{
                name: "myStringOrNumber",
                type: {
                    text: "string | number",
                    unionTypes: [{
                        text: "string"
                    }, {
                        text: "number"
                    }]
                }
            }, {
                name: "t",
                type: { text: "T" }
            }],
            typeParameters: [{
                name: "T"
            }],
            returnType: { text: "string" }
        }]
    });
});
