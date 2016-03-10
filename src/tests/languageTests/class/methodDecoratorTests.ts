import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class method decorator tests", () => {
    const code = `
function MyClassMethodDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return descriptor;
}

class MyClass {
    @MyClassMethodDecorator
    myMethod() {
    }
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassMethodDecorator",
            parameters: [{
                name: "target",
                typeExpression: {
                    text: "Object"
                }
            }, {
                name: "propertyKey",
                typeExpression: {
                    text: "string"
                }
            }, {
                name: "descriptor",
                typeExpression: {
                    text: "TypedPropertyDescriptor<any>"
                }
            }],
            returnTypeExpression: {
                text: "TypedPropertyDescriptor<any>"
            }
        }],
        classes: [{
            name: "MyClass",
            methods: [{
                name: "myMethod",
                decorators: [{
                    name: "MyClassMethodDecorator"
                }]
            }]
        }]
    });
});
