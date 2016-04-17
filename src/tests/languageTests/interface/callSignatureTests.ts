import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface method", () => {
    const code = `
interface MyInterface {
    (myParameter: string): string[];
    (myParameter: number): number[];
    (myParameter: any): any[];
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            callSignatures: [{
                returnTypeExpression: { text: "string[]" },
                parameters: [{
                    name: "myParameter",
                    typeExpression: { text: "string" }
                }],
                minArgumentCount: 1
            }, {
                returnTypeExpression: { text: "number[]" },
                parameters: [{
                    name: "myParameter",
                    typeExpression: { text: "number" }
                }],
                minArgumentCount: 1
            }, {
                returnTypeExpression: { text: "any[]" },
                parameters: [{
                    name: "myParameter",
                    typeExpression: { text: "any" }
                }],
                minArgumentCount: 1
            }]
        }]
    });
});
