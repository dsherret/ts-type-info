var main_1 = require("./../../main");
var assert = require("assert");
describe("type parameter", function () {
    var code = "\nclass MyClass<T> {\n    str: T;\n}";
    var def = main_1.getStringInfo(code);
    it("should have a type parameter name of T", function () {
        assert.equal(def.classes[0].typeParameter.name, "T");
    });
});
