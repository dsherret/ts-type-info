var tsTypeInfo = require("./../main");
var assert = require("assert");
var path = require("path");
describe("Main", function () {
    describe("#getFileInfo()", function () {
        it("should throw an error when not providing an array", function () {
            assert.throws(function () { return tsTypeInfo.getFileInfo(""); }, Error);
        });
        it("should not handle a non ts file when specifying not to allow them", function () {
            var result = tsTypeInfo.getFileInfo([path.join(__dirname, "../../src/tests/test-files/non-ts-file.txt")], {
                compilerOptions: { allowNonTsExtensions: false }
            });
            assert.equal(result.length, 0);
        });
        it("should get the class definition when specifying the compiler option to allow non ts extensions", function () {
            var result = tsTypeInfo.getFileInfo([path.join(__dirname, "../../src/tests/test-files/non-ts-file.txt")], {
                compilerOptions: { allowNonTsExtensions: true }
            });
            assert.equal(result[0].classes[0].name, "MyClass");
        });
    });
    describe("#getStringInfo()", function () {
        it("should throw an error when not providing a string", function () {
            assert.throws(function () { return tsTypeInfo.getStringInfo([]); }, Error);
        });
        it("should allow changing the compiler options", function () {
            var result = tsTypeInfo.getStringInfo("class MyClass {}\n\n", {});
            assert.equal(result.classes[0].name, "MyClass");
        });
    });
});

//# sourceMappingURL=main-tests.js.map
