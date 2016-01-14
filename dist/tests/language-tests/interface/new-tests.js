var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface name tests", function () {
    var code = "\ninterface MyInterface {\n    new(): MyInterface;\n}\n\ninterface MyInterfaceWithMultipleNew {\n    new(): MyInterface;\n    new(str: string): MyInterface;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        interfaces: [{
                name: "MyInterface",
                newSignatures: [{
                        returnTypeExpression: { text: "MyInterface" }
                    }]
            }, {
                name: "MyInterfaceWithMultipleNew",
                newSignatures: [{
                        returnTypeExpression: { text: "MyInterface" }
                    }, {
                        parameters: [{
                                name: "str",
                                typeExpression: { text: "string" }
                            }],
                        returnTypeExpression: { text: "MyInterface" }
                    }]
            }]
    });
});

//# sourceMappingURL=new-tests.js.map
