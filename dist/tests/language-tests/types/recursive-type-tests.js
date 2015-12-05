var main_1 = require("./../../../main");
var assert = require("assert");
describe("recursive type tests", function () {
    var code = "\nclass Note {\n    name: string;\n    note: Note;\n\n    myMethod(note: Note) {\n        let notes: Note[];\n        return notes;\n    }\n}\n";
    var def = main_1.getStringInfo(code);
    describe("note parameter", function () {
        var prop = def.classes[0].properties[1];
        it("should exist", function () {
            assert.equal(prop.name, "note");
        });
        it("should have type Note", function () {
            assert.equal(prop.type.name, "Note");
        });
    });
});
