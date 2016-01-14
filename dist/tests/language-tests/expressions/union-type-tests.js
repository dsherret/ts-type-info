var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("union type tests", function () {
    var code = "\nclass MyClass {\n    prop: MyClass | MyOtherClass<string>;\n}\n\nclass MyOtherClass<T> {\n}\n";
    var def = main_1.getStringInfo(code);
    // todo: verify this works in testing
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyClass",
                properties: [{
                        name: "prop",
                        typeExpression: {
                            text: "MyClass | MyOtherClass<string>",
                            types: [{
                                    text: "MyClass"
                                }, {
                                    text: "MyOtherClass<string>",
                                    typeArguments: [{
                                            text: "string"
                                        }]
                                }]
                        }
                    }]
            }, {
                name: "MyOtherClass",
                typeParameters: [{
                        name: "T"
                    }]
            }]
    });
});

//# sourceMappingURL=union-type-tests.js.map
