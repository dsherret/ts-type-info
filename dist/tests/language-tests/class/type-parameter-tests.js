var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class type parameters", function () {
    var code = "\nclass MyClass<T, U extends string> {\n    tProp: T;\n    uProp: U;\n}\n\nclass MyExtendsClass extends MyClass<number, string> {\n}\n\nclass MyImplementsClass implements MyClass<number, string> {\n    tProp: number;\n    uProp: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyClass",
                typeParameters: [{
                        name: "T"
                    }, {
                        name: "U",
                        constraintTypeExpression: { text: "string" }
                    }],
                properties: [{
                        name: "tProp",
                        typeExpression: { text: "T" }
                    }, {
                        name: "uProp",
                        typeExpression: { text: "U" }
                    }]
            }, {
                name: "MyExtendsClass",
                extends: [{
                        text: "MyClass<number, string>"
                    }]
            }, {
                name: "MyImplementsClass",
                implements: [{
                        text: "MyClass<number, string>"
                    }],
                properties: [{
                        name: "tProp",
                        typeExpression: { text: "number" }
                    }, {
                        name: "uProp",
                        typeExpression: { text: "string" }
                    }]
            }]
    });
});

//# sourceMappingURL=type-parameter-tests.js.map
