var assert = require("assert");
var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("object type tests", function () {
    var code = "\nclass MyClass {\n    myMethod(obj: { myStringParam: string; myOtherType: Note; }) {\n    }\n}\nclass Note {\n}";
    var def = main_1.getStringInfo(code);
    describe("myStringParam", function () {
        var prop = def.classes[0].methods[0].parameters[0].type.properties[0];
        test_helpers_1.runNamedDefinitionTests(prop, "myStringParam");
        it("should have type string", function () {
            assert.equal(prop.type.name, "string");
        });
    });
    describe("myOtherType", function () {
        var prop = def.classes[0].methods[0].parameters[0].type.properties[1];
        test_helpers_1.runNamedDefinitionTests(prop, "myOtherType");
        it("should have type Note", function () {
            assert.equal(prop.type.name, "Note");
        });
    });
});

//# sourceMappingURL=object-type-tests.js.map
