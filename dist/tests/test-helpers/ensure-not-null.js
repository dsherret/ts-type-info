var assert = require("assert");
function ensureNotNull(obj, additionalTestsIfNotNull) {
    if (obj == null) {
        it("should not be null", function () {
            assert.notEqual(obj, null);
        });
    }
    else {
        additionalTestsIfNotNull();
    }
}
exports.ensureNotNull = ensureNotNull;

//# sourceMappingURL=ensure-not-null.js.map
