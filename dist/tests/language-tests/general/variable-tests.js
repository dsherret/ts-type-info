var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("variable tests", function () {
    var code = "\nvar myExplicitTypeVar: number;\nvar myImplicitTypeVar = \"my string\";\nlet myLet: string;\nconst myConst: number;\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        variables: [{
                declarationType: "var",
                name: "myExplicitTypeVar",
                typeExpression: { text: "number" }
            }, {
                declarationType: "var",
                name: "myImplicitTypeVar",
                typeExpression: { text: "string" },
                defaultExpression: { text: "\"my string\"" }
            }, {
                declarationType: "let",
                name: "myLet",
                typeExpression: { text: "string" }
            }, {
                declarationType: "const",
                name: "myConst",
                typeExpression: { text: "number" }
            }]
    });
});

//# sourceMappingURL=variable-tests.js.map
