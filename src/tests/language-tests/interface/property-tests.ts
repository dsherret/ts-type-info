import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("interface property tests", () => {
    const code = `
interface MyPropertyInterface {
    myString: string;
    myAny;
    myOptional?: string;
}`;

    const def = getStringInfo(code);

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
