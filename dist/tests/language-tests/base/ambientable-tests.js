var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
var definitions_1 = require("./../../../definitions");
describe("ambientable tests", function () {
    var code = "\ndeclare class MyAmbientClass {}\ndeclare interface MyAmbientInterface {}\ndeclare function MyAmbientFunction(): void;\ndeclare var MyAmbientVariable;\ndeclare enum MyAmbientEnum {};\ndeclare namespace MyAmbientNamespace {}\ndeclare module MyAmbientModule {\n    class MyClass {\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyAmbientClass",
                isAmbient: true,
                hasDeclareKeyword: true
            }],
        interfaces: [{
                name: "MyAmbientInterface",
                isAmbient: true,
                hasDeclareKeyword: true
            }],
        functions: [{
                name: "MyAmbientFunction",
                isAmbient: true,
                hasDeclareKeyword: true
            }],
        variables: [{
                name: "MyAmbientVariable",
                declarationType: definitions_1.VariableDeclarationType.Var,
                isAmbient: true,
                hasDeclareKeyword: true
            }],
        enums: [{
                name: "MyAmbientEnum",
                isAmbient: true,
                hasDeclareKeyword: true
            }],
        namespaces: [{
                name: "MyAmbientNamespace",
                declarationType: definitions_1.NamespaceDeclarationType.Namespace,
                isAmbient: true,
                hasDeclareKeyword: true
            }, {
                name: "MyAmbientModule",
                declarationType: definitions_1.NamespaceDeclarationType.Module,
                isAmbient: true,
                hasDeclareKeyword: true,
                classes: [{
                        name: "MyClass",
                        isAmbient: true,
                        hasDeclareKeyword: false,
                        isExported: true // anything within an ambient definition is exported
                    }]
            }],
    });
});

//# sourceMappingURL=ambientable-tests.js.map
