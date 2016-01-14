var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("function type parameters", function () {
    var code = "\nfunction myTypeParameterFunction<T, U extends string>(tParam: T, uParam: U) {\n    console.log(param1);\n    console.log(param2);\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        functions: [{
                name: "myTypeParameterFunction",
                typeParameters: [{
                        name: "T"
                    }, {
                        name: "U",
                        constraintTypeExpression: { text: "string" }
                    }],
                parameters: [{
                        name: "tParam",
                        typeExpression: { text: "T" }
                    }, {
                        name: "uParam",
                        typeExpression: { text: "U" }
                    }]
            }]
    });
});

//# sourceMappingURL=type-parameter-tests.js.map
