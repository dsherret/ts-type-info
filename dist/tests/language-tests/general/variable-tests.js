var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
var definitions_1 = require("./../../../definitions");
describe("variable tests", function () {
    var code = "\nvar myExplicitTypeVar: number;\nvar myImplicitTypeVar = \"my string\";\nlet myLet: string;\nconst myConst: number;\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        variables: [{
                declarationType: definitions_1.VariableDeclarationType.Var,
                name: "myExplicitTypeVar",
                typeExpression: { text: "number" }
            }, {
                declarationType: definitions_1.VariableDeclarationType.Var,
                name: "myImplicitTypeVar",
                typeExpression: { text: "string" },
                defaultExpression: { text: "\"my string\"" }
            }, {
                declarationType: definitions_1.VariableDeclarationType.Let,
                name: "myLet",
                typeExpression: { text: "string" }
            }, {
                declarationType: definitions_1.VariableDeclarationType.Const,
                name: "myConst",
                typeExpression: { text: "number" }
            }]
    });
});

//# sourceMappingURL=variable-tests.js.map
