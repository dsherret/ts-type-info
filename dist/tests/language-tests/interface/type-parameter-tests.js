var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface type parameters", function () {
    var code = "\ninterface MyInterface<T, U extends string> {\n    tProp: T;\n    uProp: U;\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        interfaces: [{
                name: "MyInterface",
                typeParameters: [{
                        name: "T",
                    }, {
                        name: "U",
                        constraintTypeExpression: { text: "string" }
                    }],
                properties: [{
                        name: "tProp",
                        typeExpression: { text: "T" }
                    }, {
                        name: "uProp",
                        typeExpression: { text: "U" }
                    }]
            }]
    });
});

//# sourceMappingURL=type-parameter-tests.js.map
