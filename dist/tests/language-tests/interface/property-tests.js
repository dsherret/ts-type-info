var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface property tests", function () {
    var code = "\ninterface MyPropertyInterface {\n    myString: string;\n    myAny;\n    myOptional?: string;\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        interfaces: [{
                name: "MyPropertyInterface",
                properties: [{
                        name: "myString",
                        typeExpression: { text: "string" }
                    }, {
                        name: "myAny",
                        typeExpression: { text: "any" }
                    }, {
                        name: "myOptional",
                        typeExpression: { text: "string" },
                        isOptional: true
                    }]
            }]
    });
});

//# sourceMappingURL=property-tests.js.map
