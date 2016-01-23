var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
var definitions_1 = require("./../../../definitions");
describe("ambientable tests", function () {
    var code = "\ndeclare class MyAmbientClass {}\ndeclare interface MyAmbientInterface {}\ndeclare function MyAmbientFunction(): void;\ndeclare var MyAmbientVariable;\ndeclare enum MyAmbientEnum {};\ndeclare namespace MyAmbientNamespace {}\ndeclare module MyAmbientModule {}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyAmbientClass",
                isAmbient: true
            }],
        interfaces: [{
                name: "MyAmbientInterface",
                isAmbient: true
            }],
        functions: [{
                name: "MyAmbientFunction",
                isAmbient: true
            }],
        variables: [{
                name: "MyAmbientVariable",
                declarationType: definitions_1.VariableDeclarationType.Var,
                isAmbient: true
            }],
        enums: [{
                name: "MyAmbientEnum",
                isAmbient: true
            }],
        namespaces: [{
                name: "MyAmbientNamespace",
                declarationType: definitions_1.NamespaceDeclarationType.Namespace,
                isAmbient: true
            }, {
                name: "MyAmbientModule",
                declarationType: definitions_1.NamespaceDeclarationType.Module,
                isAmbient: true
            }],
    });
});

//# sourceMappingURL=ambientable-tests.js.map
