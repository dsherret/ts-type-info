var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class method decorator parameter tests", function () {
    var code = "\nfunction MyClassMethodParameterDecorator(target: any, propertyKey: string | symbol, parameterIndex: number) {\n}\n\nclass MyClass {\n    myMethod1(@MyClassMethodParameterDecorator param1: string) {\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
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

//# sourceMappingURL=class-method-parameter-decorator-tests.js.map
