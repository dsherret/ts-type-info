var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface name tests", function () {
    var code = "\nclass MyClass {\n    name: string;\n}\n\ninterface MyInterface {\n    new(): MyClass;\n}\n\ninterface MyInterfaceWithMultipleNew {\n    new(): MyClass;\n    new(str: string): MyClass;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runInterfaceNewSignatureDefinitionTests(def.interfaces[0].newSignatures[0], {
        parameters: [],
        returnType: "MyClass"
    });
    test_helpers_1.runInterfaceNewSignatureDefinitionTests(def.interfaces[1].newSignatures[0], {
        parameters: [],
        returnType: "MyClass"
    });
    test_helpers_1.runInterfaceNewSignatureDefinitionTests(def.interfaces[1].newSignatures[1], {
        parameters: [{
                name: "str",
                type: "string"
            }],
        returnType: "MyClass"
    });
});

//# sourceMappingURL=new-tests.js.map
