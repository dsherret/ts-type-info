import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("object type tests", () => {
    const code = `
class MyClass {
    // this object type is pruposefully long because the typescript compiler will omit the text once
    // the object type text is long enough unless TypeFormatFlags.NoTruncation is set
    myMethod(obj: { myString: string; myOtherType?: Note; myNext: string; myNext2: string; myReallyReallyReallyReallyReallyLongName: string; }) {
    }
}
class Note {
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            methods: [{
                name: "myMethod",
                parameters: [{
                    name: "obj",
                    typeExpression: {
                        text: "{ myString: string; myOtherType?: Note; myNext: string; myNext2: string; myReallyReallyReallyReallyReallyLongName: string; }",
                        types: [{
                            text: "{ myString: string; myOtherType?: Note; myNext: string; myNext2: string; myReallyReallyReallyReallyReallyLongName: string; }",
                            properties: [{
                                name: "myString",
                                typeExpression: { text: "string" }
                            }, {
                                name: "myOtherType",
                                isOptional: true,
                                typeExpression: { text: "Note" }
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
                        }]
                    }
                }]
            }]
        }, {
            name: "Note"
        }]
    });
});
