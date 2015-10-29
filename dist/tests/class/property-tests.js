var main_1 = require("./../../main");
var assert = require("assert");
describe("class property tests", function () {
    var code = "\nclass MyClass {\n    myString: string;\n    myImplicit = 4;\n    myAny;\n\n    private myPrivate;\n}";
    var def = main_1.getStringInfo(code);
    describe("property myString", function () {
        var prop = def.classes[0].properties[0];
        it("should have name myString", function () {
            assert.equal(prop.name, "myString");
        });
        it("should have type string", function () {
            assert.equal(prop.type.name, "string");
        });
    });
    describe("property myImplicit", function () {
        var prop = def.classes[0].properties[1];
        it("should have name myImplicit", function () {
            assert.equal(prop.name, "myImplicit");
        });
        it("should have type number", function () {
            assert.equal(prop.type.name, "number");
        });
    });
    describe("property myAny", function () {
        var prop = def.classes[0].properties[2];
        it("should have name myAny", function () {
            assert.equal(prop.name, "myAny");
        });
        it("should have type any", function () {
            assert.equal(prop.type.name, "any");
        });
    });
    describe("property myPrivate", function () {
        var prop = def.classes[0].properties[3];
        it("should have name myPrivate", function () {
            assert.equal(prop.name, "myPrivate");
        });
        it("should be private", function () {
            assert.equal(prop.type.name, "any");
        });
    });
});
