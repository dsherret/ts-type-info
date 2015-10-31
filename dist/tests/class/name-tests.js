var main_1 = require("./../../main");
var assert = require("assert");
describe("class name tests", function () {
    var code = "\nclass MyClass {\n}";
    var def = main_1.getStringInfo(code);
    it("should have a name of MyClass", function () {
        assert.equal(def.classes[0].name, "MyClass");
    });
});
