var main_1 = require("./../../../main");
var assert = require("assert");
describe("function type tests", function () {
    var code = "\nclass MyClass {\n    myMethod(func: (str: string) => void)) {\n    }\n}";
    var def = main_1.getStringInfo(code);
    var param = def.classes[0].methods[0].parameters[0];
    it("should have type name of (str: string) => void", function () {
        assert.equal(param.type.name, "(str: string) => void");
    });
    it("should have one parameter", function () {
        assert.equal(param.type.callSignatures[0].parameters.length, 1);
    });
    it("parameter should be of type string", function () {
        assert.equal(param.type.callSignatures[0].parameters[0].type.name, "string");
    });
});
