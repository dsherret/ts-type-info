import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("decorator arguments tests", () => {
    const code = `
function MyClassDecorator(myArg: string) {
    return (target: Function) => {
    };
}

@MyClassDecorator("My Value")
class MyClass1 {
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassDecorator",
            parameters: [{
                name: "myArg",
                typeExpression: {
                    text: "string"
                }
            }],
            returnTypeExpression: {
                text: "(target: Function) => void"
            }
        }],
        classes: [{
            name: "MyClass1",
            decorators: [{
                name: "MyClassDecorator",
                arguments: [{
                    text: `"My Value"`
                }]
            }]
        }]
    });
});
