import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("array type tests", () => {
    const code = `
let t: Array<MyClass>;
let u: string[];
let v: string[][];
let w: Array<Array<string>>;
class MyClass {
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "t",
            type: {
                text: "Array<MyClass>",
                isArray: true,
                arrayElementType: {
                    text: "MyClass",
                    definitions: [{
                        name: "MyClass"
                    }],
                    allDefinitions: [{
                        name: "MyClass"
                    }]
                },
                definitions: [],
                allDefinitions: [{
                    name: "MyClass"
                }]
            }
        }, {
            name: "u",
            type: {
                text: "string[]",
                isArray: true,
                arrayElementType: {
                    text: "string"
                }
            }
        }, {
            name: "v",
            type: {
                text: "string[][]",
                isArray: true,
                arrayElementType: {
                    text: "string[]",
                    isArray: true,
                    arrayElementType: {
                        text: "string"
                    }
                }
            }
        }, {
            name: "w",
            type: {
                text: "Array<Array<string>>",
                isArray: true,
                arrayElementType: {
                    text: "Array<string>",
                    isArray: true,
                    arrayElementType: {
                        text: "string"
                    }
                }
            }
        }],
        classes: [{
            name: "MyClass"
        }]
    });
});
