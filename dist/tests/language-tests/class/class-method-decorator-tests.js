var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class method decorator tests", function () {
    var code = "\nfunction MyClassMethodDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {\n    return descriptor;\n}\n\nclass MyClass {\n    @MyClassMethodDecorator\n    myMethod() {\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
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

//# sourceMappingURL=class-method-decorator-tests.js.map
