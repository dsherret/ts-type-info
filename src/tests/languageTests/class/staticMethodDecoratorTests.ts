import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

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

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassStaticMethodDecorator",
            parameters: [{
                name: "target",
                type: {
                    text: "Object"
                }
            }, {
                name: "propertyKey",
                type: {
                    text: "string"
                }
            }, {
                name: "descriptor",
                type: {
                    text: "TypedPropertyDescriptor<any>"
                }
            }],
            returnType: {
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
