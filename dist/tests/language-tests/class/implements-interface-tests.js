var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class implements interface tests", function () {
    var code = "\ninterface MyInterface {\n    name: string;\n}\n\ninterface MyTest {\n    name2: string;\n}\n\nclass MyClassImplementsInterface implements MyInterface, MyTest {\n    name: string;\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        interfaces: [{
                name: "MyInterface",
                properties: [{
                        name: "name",
                        typeExpression: {
                            text: "string"
                        }
                    }]
            }, {
                name: "MyTest",
                properties: [{
                        name: "name2",
                        typeExpression: {
                            text: "string"
                        }
                    }]
            }],
        classes: [{
                name: "MyClassImplementsInterface",
                implements: [{ text: "MyInterface" }, { text: "MyTest" }],
                properties: [{
                        name: "name",
                        typeExpression: {
                            text: "string"
                        }
                    }, {
                        name: "name2",
                        typeExpression: {
                            text: "string"
                        }
                    }]
            }]
    });
});

//# sourceMappingURL=implements-interface-tests.js.map
