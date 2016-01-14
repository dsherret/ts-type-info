var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("object type tests", function () {
    var code = "\nclass MyClass {\n    myMethod(obj: { myStringParam: string; myOtherType?: Note; }) {\n    }\n}\nclass Note {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyClass",
                methods: [{
                        name: "myMethod",
                        parameters: [{
                                name: "obj",
                                typeExpression: {
                                    text: "{ myStringParam: string; myOtherType?: Note; }",
                                    types: [{
                                            text: "{ myStringParam: string; myOtherType?: Note; }",
                                            properties: [{
                                                    name: "myStringParam",
                                                    typeExpression: { text: "string" }
                                                }, {
                                                    name: "myOtherType",
                                                    isOptional: true,
                                                    typeExpression: { text: "Note" }
                                                }]
                                        }]
                                }
                            }]
                    }]
            }, {
                name: "Note"
            }]
    });
});

//# sourceMappingURL=object-type-tests.js.map
