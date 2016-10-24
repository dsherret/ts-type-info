import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("decorator arguments tests", () => {
    const code = `
function MyDecoratorFactory() {
    return (target: Function) => {
    };
}

function MyClassDecorator(myArg: string) {
    return (target: Function) => {
    };
}

@MyDecoratorFactory()
@MyClassDecorator("My Value")
class MyClass1 {
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyDecoratorFactory",
            returnType: {
                text: "(target: Function) => void"
            }
        }, {
            name: "MyClassDecorator",
            parameters: [{
                name: "myArg",
                type: {
                    text: "string"
                }
            }],
            returnType: {
                text: "(target: Function) => void"
            }
        }],
        classes: [{
            name: "MyClass1",
            decorators: [{
                name: "MyDecoratorFactory",
                isDecoratorFactory: true
            }, {
                name: "MyClassDecorator",
                isDecoratorFactory: true,
                arguments: [{
                    text: `"My Value"`
                }]
            }]
        }]
    });
});
