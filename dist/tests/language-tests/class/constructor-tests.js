var main_1 = require("./../../../main");
var assert = require("assert");
describe("class constructor tests", function () {
    describe("class with no constructor", function () {
        var code = "\nclass MyClass {\n}";
        var def = main_1.getStringInfo(code);
        it("should not have a constructor", function () {
            assert.equal(def.classes[0].constructor, null);
        });
    });
    describe("constructor with no parameters", function () {
        var code = "\nclass MyClass {\n    constructor() {\n    }\n}";
        var def = main_1.getStringInfo(code);
        it("should have a constructor", function () {
            assert.notEqual(def.classes[0].constructor, null);
        });
        it("should have no parameters", function () {
            assert.equal(def.classes[0].constructor.parameters.length, 0);
        });
    });
    describe("constructor with parameters", function () {
        var code = "\nclass MyClass {\n    constructor(parameter1: string, parameter2: number) {\n    }\n}";
        var def = main_1.getStringInfo(code);
        it("should have two parameters", function () {
            assert.equal(def.classes[0].constructor.parameters.length, 2);
        });
    });
});
