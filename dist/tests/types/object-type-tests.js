var main_1 = require("./../../main");
var assert = require("assert");
describe("object type tests", function () {
    var code = "\nclass MyClass {\n    myMethod(obj: { myStringParam: string; myOtherType: Note; }) {\n    }\n}\nclass Note {\n}";
    var def = main_1.getStringInfo(code);
    describe("myStringParam", function () {
        it("should exist", function () {
            assert.equal(def.classes[0].methods[0].parameters[0].type.properties[0].name, "myStringParam");
        });
        it("should have type string", function () {
            assert.equal(def.classes[0].methods[0].parameters[0].type.properties[0].type.name, "string");
        });
    });
    describe("myOtherType", function () {
        it("should exist", function () {
            assert.equal(def.classes[0].methods[0].parameters[0].type.properties[1].name, "myOtherType");
        });
        it("should have type Note", function () {
            assert.equal(def.classes[0].methods[0].parameters[0].type.properties[1].type.name, "Note");
        });
    });
});
