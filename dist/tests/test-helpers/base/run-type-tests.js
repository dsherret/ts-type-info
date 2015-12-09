var assert = require("assert");
function runTypeTests(type, name) {
    if (type == null) {
        throw "Type should not be null.";
    }
    it("should have a type of " + name, function () {
        assert.equal(type.name, name);
    });
}
exports.runTypeTests = runTypeTests;

//# sourceMappingURL=run-type-tests.js.map
