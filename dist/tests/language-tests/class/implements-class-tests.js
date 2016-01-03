var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class implements class tests", function () {
    var code = "\nclass MyBaseClass {\n    name: string;\n}\n\nclass MyClassImplementsClass implements MyBaseClass {\n    name: string;\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamedDefinitionTests(def.classes[0], "MyBaseClass");
    test_helpers_1.runNamedDefinitionTests(def.classes[1], "MyClassImplementsClass");
    describe("implements clause", function () {
        test_helpers_1.runTypeExpressionTests(def.classes[1].implements[0], "MyBaseClass");
    });
    it("should have nothing in the extends clause", function () {
        assert.equal(def.classes[1].extends.length, 0);
    });
});

//# sourceMappingURL=implements-class-tests.js.map
