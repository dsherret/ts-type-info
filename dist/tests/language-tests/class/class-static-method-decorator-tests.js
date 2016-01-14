var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class static method decorator tests", function () {
    var code = "\nfunction MyClassStaticMethodDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {\n    return descriptor;\n}\n\nclass MyClass {\n    @MyClassStaticMethodDecorator\n    static myStaticMethod() {\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
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

//# sourceMappingURL=class-static-method-decorator-tests.js.map
