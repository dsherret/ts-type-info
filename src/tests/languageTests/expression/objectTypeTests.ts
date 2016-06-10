import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("object type tests", () => {
    const code = `
let obj: { myString: string; myOtherType?: Note; myNext: string; myNext2: string; myReallyReallyReallyReallyReallyLongName: string; };

class Note {
    prop: string;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "obj",
            typeExpression: {
                text: "{ myString: string; myOtherType?: Note; myNext: string; myNext2: string; myReallyReallyReallyReallyReallyLongName: string; }",
                properties: [{
                    name: "myString",
                    typeExpression: { text: "string" }
                }, {
                    name: "myOtherType",
                    isOptional: true,
                    typeExpression: {
                        text: "Note",
                        properties: [] // shouldn't have any properties
                    }
                }, {
                    name: "myNext",
                    typeExpression: { text: "string" }
                }, {
                    name: "myNext2",
                    typeExpression: { text: "string" }
                }, {
                    name: "myReallyReallyReallyReallyReallyLongName",
                    typeExpression: { text: "string" }
                }]
            }
        }],
        classes: [{
            name: "Note",
            properties: [{
                name: "prop",
                typeExpression: { text: "string" }
            }]
        }]
    });
});
