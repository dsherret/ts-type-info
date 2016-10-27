import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface property tests", () => {
    const code = `
interface MyPropertyInterface {
    /**
      * Some description
      */
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
                type: { text: "string" },
                documentationComment: `/**\n * Some description\n */`
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
