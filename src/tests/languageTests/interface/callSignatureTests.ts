import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("call signature tests", () => {
    const code = `
interface MyInterface {
    (myParameter: string): string;
    (myParameter: number): number;
    (myParameter: any): any;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            callSignatures: [{
                returnType: { text: "string" },
                parameters: [{
                    name: "myParameter",
                    type: { text: "string" }
                }],
                minArgumentCount: 1
            }, {
                returnType: { text: "number" },
                parameters: [{
                    name: "myParameter",
                    type: { text: "number" }
                }],
                minArgumentCount: 1
            }, {
                returnType: { text: "any" },
                parameters: [{
                    name: "myParameter",
                    type: { text: "any" }
                }],
                minArgumentCount: 1
            }]
        }]
    });
});
