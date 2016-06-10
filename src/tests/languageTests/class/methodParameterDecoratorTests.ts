import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class method decorator parameter tests", () => {
    const code = `
function MyClassMethodParameterDecorator(target: any, propertyKey: string, parameterIndex: number) {
}

class MyClass {
    myMethod1(@MyClassMethodParameterDecorator param1: string) {
    }
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassMethodParameterDecorator",
            parameters: [{
                name: "target",
                type: {
                    text: "any"
                }
            }, {
                name: "propertyKey",
                type: {
                    text: "string"
                }
            }, {
                name: "parameterIndex",
                type: {
                    text: "number"
                }
            }]
        }],
        classes: [{
            name: "MyClass",
            methods: [{
                name: "myMethod1",
                parameters: [{
                    name: "param1",
                    type: {
                        text: "string"
                    },
                    decorators: [{
                        name: "MyClassMethodParameterDecorator"
                    }]
                }]
            }]
        }]
    });
});
