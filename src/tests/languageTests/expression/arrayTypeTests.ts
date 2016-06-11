import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("array type tests", () => {
    const code = `
let t: Array<MyClass>;
class MyClass {
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "t",
            type: {
                text: "MyClass[]",
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
        }],
        classes: [{
            name: "MyClass"
        }]
    });
});
