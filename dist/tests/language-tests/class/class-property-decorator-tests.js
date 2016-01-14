var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class property decorator tests", function () {
    var code = "\nfunction MyClassPropertyDecorator(target: Object, propertyKey: string) {\n}\n\nfunction MyClassPropertyAccessorDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {\n    return descriptor;\n}\n\nclass MyClass {\n    @MyClassPropertyDecorator\n    myProperty1: string;\n\n    @MyClassPropertyAccessorDecorator\n    get myProperty2() {\n        return \"\";\n    }\n\n    @MyClassPropertyAccessorDecorator\n    set myProperty3(val: string) {\n    }\n\n    get myProperty3() {\n        return \"\";\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
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

//# sourceMappingURL=class-property-decorator-tests.js.map
