import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("object type tests", () => {
    const code = `
let obj: { readonly myString: string; myOtherType?: Note; myNext: string; myNext2: string; myReallyReallyReallyReallyReallyLongName: string; };

class Note {
    prop: string;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "obj",
            type: {
                text: "{ readonly myString: string; myOtherType?: Note; myNext: string; myNext2: string; myReallyReallyReallyReallyReallyLongName: string; }",
                properties: [{
                    name: "myString",
                    type: { text: "string" },
                    isReadonly: true
                }, {
                    name: "myOtherType",
                    isOptional: true,
                    type: {
                        text: "Note",
                        properties: [] // shouldn't have any properties
                    }
                }, {
                    name: "myNext",
                    type: { text: "string" }
                }, {
                    name: "myNext2",
                    type: { text: "string" }
                }, {
                    name: "myReallyReallyReallyReallyReallyLongName",
                    type: { text: "string" }
                }],
                allDefinitions: [{ name: "Note" }]
            }
        }],
        classes: [{
            name: "Note",
            properties: [{
                name: "prop",
                type: { text: "string" }
            }]
        }]
    });
});
