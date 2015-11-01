var main_1 = require("./../../main");
var assert = require("assert");
describe("type parameter with extends", function () {
    var code = "\nclass MyClass<T extends string> {\n    str: T;\n}";
    var def = main_1.getStringInfo(code);
    it("it should extend a type string", function () {
        assert.equal(def.classes[0].typeParameters[0].constraint.name, "string");
    });
});
