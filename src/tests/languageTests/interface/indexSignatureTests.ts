import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("index signature tests", () => {
    const code = `
interface MyInterface {
    readonly [str: string]: Date;
    [num: number]: Date;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            indexSignatures: [{
                isReadonly: true,
                keyName: "str",
                keyType: { text: "string" },
                returnType: { text: "Date" }
            }, {
                keyName: "num",
                keyType: { text: "number" },
                returnType: { text: "Date" }
            }]
        }]
    });
});
