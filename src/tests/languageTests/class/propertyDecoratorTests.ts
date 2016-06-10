import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class property decorator tests", () => {
    const code = `
function MyClassPropertyDecorator(target: Object, propertyKey: string) {
}

function MyClassPropertyAccessorDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return descriptor;
}

class MyClass {
    @MyClassPropertyDecorator
    myProperty1: string;

    @MyClassPropertyAccessorDecorator
    get myProperty2() {
        return "";
    }

    @MyClassPropertyAccessorDecorator
    set myProperty3(val: string) {
    }

    get myProperty3() {
        return "";
    }
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassPropertyDecorator",
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
            }]
        }, {
            name: "MyClassPropertyAccessorDecorator",
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
            properties: [{
                name: "myProperty1",
                type: {
                    text: "string"
                },
                decorators: [{
                    name: "MyClassPropertyDecorator"
                }]
            }, {
                name: "myProperty2",
                type: {
                    text: "string"
                },
                decorators: [{
                    name: "MyClassPropertyAccessorDecorator"
                }],
                isAccessor: true,
                isReadonly: true
            }, {
                name: "myProperty3",
                type: {
                    text: "string"
                },
                decorators: [{
                    name: "MyClassPropertyAccessorDecorator"
                }],
                isAccessor: true
            }]
        }]
    });
});
