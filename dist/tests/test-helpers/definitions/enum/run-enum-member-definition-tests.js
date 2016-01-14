var assert = require("assert");
var base_1 = require("./../base");
function runEnumMemberDefinitionTests(definition, structure) {
    describe("enum member " + structure.name, function () {
        base_1.runNamedDefinitionTests(definition, structure);
        it("should have a value of " + structure.value, function () {
            assert.equal(definition.value, structure.value);
        });
    });
}
exports.runEnumMemberDefinitionTests = runEnumMemberDefinitionTests;

//# sourceMappingURL=run-enum-member-definition-tests.js.map
