var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("class implements interface tests", function () {
    var code = "\ninterface MyInterface {\n    name: string;\n}\n\ninterface MyTest {\n    name2: string;\n}\n\nclass MyClassImplementsInterface implements MyInterface, MyTest {\n    name: string;\n    name2: string;\n}\n";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runNamedDefinitionTests(def.classes[0], "MyClassImplementsInterface");
    describe("implements clause", function () {
        test_helpers_1.runTypeExpressionTests(def.classes[0].implements[0], "MyInterface");
        test_helpers_1.runTypeExpressionTests(def.classes[0].implements[1], "MyTest");
    });
    it("should have nothing in the extends clause", function () {
        assert.equal(def.classes[0].extends.length, 0);
    });
});

//# sourceMappingURL=implements-interface-tests.js.map
