var main_1 = require("./../../main");
var assert = require("assert");
describe("type parameters - multiple", function () {
    var code = "\nclass MyClass<T, U> {\n    str: T;\n}";
    var def = main_1.getStringInfo(code);
    it("should have a type parameter name of T", function () {
        assert.equal(def.classes[0].typeParameters[0].name, "T");
    });
    it("should have a second type parameter name of U", function () {
        assert.equal(def.classes[0].typeParameters[1].name, "U");
    });
});
