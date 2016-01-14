import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("object type tests", () => {
    const code = `
class MyClass {
    myMethod(obj: { myStringParam: string; myOtherType?: Note; }) {
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
                        text: "{ myStringParam: string; myOtherType?: Note; }",
                        types: [{
                            text: "{ myStringParam: string; myOtherType?: Note; }",
                            properties: [{
                                name: "myStringParam",
                                typeExpression: { text: "string" }
                            }, {
                                name: "myOtherType",
                                isOptional: true,
                                typeExpression: { text: "Note" }
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
