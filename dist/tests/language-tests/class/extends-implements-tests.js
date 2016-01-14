var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class extends implements tests", function () {
    var code = "\ninterface MyInterface {\n    name: string;\n}\n\nclass MyBaseClass {\n    prop: string;\n}\n\nclass MyExtendsImplementsClass extends MyBaseClass implements MyInterface {\n    name: string;\n}\n";
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
            }],
        classes: [{
                name: "MyBaseClass",
                properties: [{
                        name: "prop",
                        typeExpression: {
                            text: "string"
                        }
                    }]
            }, {
                name: "MyExtendsImplementsClass",
                extends: [{ text: "MyBaseClass" }],
                implements: [{ text: "MyInterface" }],
                properties: [{
                        name: "name",
                        typeExpression: {
                            text: "string"
                        }
                    }]
            }]
    });
});

//# sourceMappingURL=extends-implements-tests.js.map
