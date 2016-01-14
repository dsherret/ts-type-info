import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("class method decorator parameter tests", () => {
    const code = `
function MyClassMethodParameterDecorator(target: any, propertyKey: string | symbol, parameterIndex: number) {
}

class MyClass {
    myMethod1(@MyClassMethodParameterDecorator param1: string) {
    }
}
`;

    const def = getStringInfo(code);

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
                    text: "string | symbol"
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
