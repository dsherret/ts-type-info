import {getInfoFromString} from "./../../../main";
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

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassMethodDecorator",
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
            methods: [{
                name: "myMethod",
                decorators: [{
                    name: "MyClassMethodDecorator"
                }]
            }]
        }]
    });
});
