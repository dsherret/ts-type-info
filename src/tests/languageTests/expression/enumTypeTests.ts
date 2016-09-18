import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("enum type tests", () => {
    const code = `
enum MyEnum {
    Value
}
let e: MyEnum;
class MyClass {
    myProperty: MyEnum;
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        enums: [{
            name: "MyEnum",
            members: [{
                name: "Value",
                value: 0
            }]
        }],
        variables: [{
            name: "e",
            type: {
                text: "MyEnum",
                definitions: [{
                    name: "MyEnum"
                }],
                allDefinitions: [{
                    name: "MyEnum"
                }]
            }
        }],
        classes: [{
            name: "MyClass",
            properties: [{
                name: "myProperty",
                type: {
                    text: "MyEnum",
                    definitions: [{
                        name: "MyEnum"
                    }],
                    allDefinitions: [{
                        name: "MyEnum"
                    }]
                }
            }]
        }]
    });
});
