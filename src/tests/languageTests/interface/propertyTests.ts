import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface property tests", () => {
    const code = `
interface MyPropertyInterface {
    myString: string;
    myAny;
    myOptional?: string;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyPropertyInterface",
            properties: [{
                name: "myString",
                typeExpression: { text: "string" }
            }, {
                name: "myAny",
                typeExpression: { text: "any" }
            }, {
                name: "myOptional",
                typeExpression: { text: "string" },
                isOptional: true
            }]
        }]
    });
});
