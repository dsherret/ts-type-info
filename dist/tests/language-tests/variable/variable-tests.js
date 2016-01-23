var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
var definitions_1 = require("./../../../definitions");
describe("variable tests", function () {
    var code = "\nvar myImplicitAny;\nvar myExplicitTypeVar: number;\nvar myImplicitTypeVar = \"my string\";\nlet myLet: string;\nconst myConst: number;\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        variables: [{
                name: "myImplicitAny",
                declarationType: definitions_1.VariableDeclarationType.Var,
                typeExpression: { text: "any" }
            }, {
                name: "myExplicitTypeVar",
                declarationType: definitions_1.VariableDeclarationType.Var,
                typeExpression: { text: "number" }
            }, {
                name: "myImplicitTypeVar",
                declarationType: definitions_1.VariableDeclarationType.Var,
                typeExpression: { text: "string" },
                defaultExpression: { text: "\"my string\"" }
            }, {
                name: "myLet",
                declarationType: definitions_1.VariableDeclarationType.Let,
                typeExpression: { text: "string" }
            }, {
                name: "myConst",
                declarationType: definitions_1.VariableDeclarationType.Const,
                typeExpression: { text: "number" }
            }]
    });
});

//# sourceMappingURL=variable-tests.js.map
