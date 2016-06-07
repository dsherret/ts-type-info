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
                typeExpression: {
                    text: "any"
                }
            }, {
                name: "propertyKey",
                typeExpression: {
                    text: "string"
                }
            }, {
                name: "parameterIndex",
                typeExpression: {
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
                    typeExpression: {
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
