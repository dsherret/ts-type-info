var assert = require("assert");
function ensureDefinitionNotNull(definition, additionalTestsIfNotNull) {
    if (definition == null) {
        it("should not be null", function () {
            assert.notEqual(definition, null);
        });
    }
    else {
        additionalTestsIfNotNull();
    }
}
exports.ensureDefinitionNotNull = ensureDefinitionNotNull;

//# sourceMappingURL=ensure-definition-not-null.js.map
