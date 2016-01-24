var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
var definitions_1 = require("./../../../definitions");
describe("variable tests", function () {
    var code = "\ndeclare module \"definition-var\" {\n    export let myVariable: string[];\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        namespaces: [{
                name: "\"definition-var\"",
                declarationType: definitions_1.NamespaceDeclarationType.Module,
                isAmbient: true,
                hasDeclareKeyword: true,
                variables: [{
                        declarationType: definitions_1.VariableDeclarationType.Let,
                        name: "myVariable",
                        typeExpression: { text: "string[]" },
                        isExported: true,
                        isAmbient: true,
                        hasDeclareKeyword: false
                    }]
            }]
    });
});

//# sourceMappingURL=exported-variable-tests.js.map
