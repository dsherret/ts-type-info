var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface property tests", function () {
    var code = "\ninterface MyPropertyInterface {\n    myString: string;\n    myAny;\n    myOptional?: string;\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runPropertyDefinitionTests(def.interfaces[0].properties[0], {
        name: "myString",
        type: "string"
    });
    test_helpers_1.runPropertyDefinitionTests(def.interfaces[0].properties[1], {
        name: "myAny",
        type: "any"
    });
    test_helpers_1.runPropertyDefinitionTests(def.interfaces[0].properties[2], {
        name: "myOptional",
        type: "string",
        isOptional: true
    });
});

//# sourceMappingURL=property-tests.js.map
