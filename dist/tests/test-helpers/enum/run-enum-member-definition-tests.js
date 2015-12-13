var assert = require("assert");
var base_1 = require("./../base");
function runEnumMemberDefinitionTests(definition, enumMember) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("enum member " + enumMember.name, function () {
        base_1.runNamedDefinitionTests(definition, enumMember.name);
        it("should have a value of " + enumMember.value, function () {
            assert.equal(definition.value, enumMember.value);
        });
    });
}
exports.runEnumMemberDefinitionTests = runEnumMemberDefinitionTests;

//# sourceMappingURL=run-enum-member-definition-tests.js.map
