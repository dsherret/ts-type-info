var main_1 = require("./../../../main");
var assert = require("assert");
describe("class type parameters", function () {
    var code = "\nclass MyClass<T, U extends string> {\n    tProp: T;\n    uProp: U;\n}";
    var def = main_1.getStringInfo(code);
    it("should have a type parameter name of T", function () {
        assert.equal(def.classes[0].typeParameters[0].name, "T");
    });
    it("should have a second type parameter name of U", function () {
        assert.equal(def.classes[0].typeParameters[1].name, "U");
    });
    it("it should extend a type string", function () {
        assert.equal(def.classes[0].typeParameters[1].constraint.name, "string");
    });
});

//# sourceMappingURL=type-parameter-tests.js.map
