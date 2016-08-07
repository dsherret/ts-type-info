import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface property tests", () => {
    const code = `
interface MyPropertyInterface {
    readonly myString: string;
    myAny;
    myOptional?: string;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyPropertyInterface",
            properties: [{
                name: "myString",
                isReadonly: true,
                type: { text: "string" }
            }, {
                name: "myAny",
                type: { text: "any" }
            }, {
                name: "myOptional",
                type: { text: "string" },
                isOptional: true
            }]
        }]
    });
});
