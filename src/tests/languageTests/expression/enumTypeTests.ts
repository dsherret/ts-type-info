import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("enum type tests", () => {
    const code = `
enum MyEnum {
    Value1,
    Value2
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
                name: "Value1",
                value: 0
            }, {
                name: "Value2",
                value: 1
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
