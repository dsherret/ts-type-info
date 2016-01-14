import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("class static method decorator tests", () => {
    const code = `
function MyClassStaticMethodDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return descriptor;
}

class MyClass {
    @MyClassStaticMethodDecorator
    static myStaticMethod() {
    }
}
`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassStaticMethodDecorator",
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
            staticMethods: [{
                name: "myStaticMethod",
                decorators: [{
                    name: "MyClassStaticMethodDecorator"
                }]
            }]
        }]
    });
});
