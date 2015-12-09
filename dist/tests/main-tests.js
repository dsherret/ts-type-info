var tsTypeInfo = require("./../main");
var assert = require("assert");
describe("Main", function () {
    describe("#getFileInfo()", function () {
        it("should throw an error when not providing an array", function () {
            assert.throws(function () { return tsTypeInfo.getFileInfo(""); }, Error);
        });
    });
    describe("#getStringInfo()", function () {
        it("should throw an error when not providing a string", function () {
            assert.throws(function () { return tsTypeInfo.getStringInfo([]); }, Error);
        });
    });
});

//# sourceMappingURL=main-tests.js.map
