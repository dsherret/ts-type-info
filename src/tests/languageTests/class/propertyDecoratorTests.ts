import {getStringInfo} from "./../../../main";
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

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        functions: [{
            name: "MyClassPropertyDecorator",
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
            }]
        }, {
            name: "MyClassPropertyAccessorDecorator",
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
            properties: [{
                name: "myProperty1",
                typeExpression: {
                    text: "string"
                },
                decorators: [{
                    name: "MyClassPropertyDecorator"
                }]
            }, {
                name: "myProperty2",
                typeExpression: {
                    text: "string"
                },
                decorators: [{
                    name: "MyClassPropertyAccessorDecorator"
                }],
                isAccessor: true,
                isReadonly: true
            }, {
                name: "myProperty3",
                typeExpression: {
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
