var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class static property decorator tests", function () {
    var code = "\nfunction MyClassStaticPropertyDecorator(target: Object, propertyKey: string) {\n}\n\nclass MyClass {\n    @MyClassStaticPropertyDecorator\n    static myStaticProperty: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        functions: [{
                name: "MyClassStaticPropertyDecorator",
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
            }],
        classes: [{
                name: "MyClass",
                staticProperties: [{
                        name: "myStaticProperty",
                        typeExpression: {
                            text: "string"
                        },
                        decorators: [{
                                name: "MyClassStaticPropertyDecorator"
                            }]
                    }]
            }]
    });
});

//# sourceMappingURL=class-static-property-decorator-tests.js.map
