var assert = require("assert");
var base_1 = require("./../base");
var run_enum_member_definition_tests_1 = require("./run-enum-member-definition-tests");
function runEnumDefinitionTests(definition, enumDef) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("enum " + enumDef.name, function () {
        base_1.runNamedDefinitionTests(definition, enumDef.name);
        base_1.runExportableDefinitionTests(definition, enumDef.isExported);
        it("should have " + enumDef.members.length + " member(s)", function () {
            assert.equal(definition.members.length, enumDef.members.length);
        });
        definition.members.forEach(function (member, i) {
            run_enum_member_definition_tests_1.runEnumMemberDefinitionTests(member, enumDef.members[i]);
        });
    });
}
exports.runEnumDefinitionTests = runEnumDefinitionTests;

//# sourceMappingURL=run-enum-definition-tests.js.map
