var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("interface property tests", function () {
    var code = "\ninterface MyInterface {\n    myString: string;\n    myAny;\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runPropertyDefinitionTests(def.interfaces[0].properties[0], {
        name: "myString",
        type: "string"
    });
    test_helpers_1.runPropertyDefinitionTests(def.interfaces[0].properties[1], {
        name: "myAny",
        type: "any"
    });
});

//# sourceMappingURL=property-tests.js.map
