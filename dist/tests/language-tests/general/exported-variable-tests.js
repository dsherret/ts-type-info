var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("variable tests", function () {
    var code = "\ndeclare module \"definition-var\" {\n    export let myVariable: string[];\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        namespaces: [{
                name: "\"definition-var\"",
                variables: [{
                        declarationType: "let",
                        name: "myVariable",
                        typeExpression: { text: "string[]" },
                        isExported: true
                    }]
            }]
    });
});

//# sourceMappingURL=exported-variable-tests.js.map
