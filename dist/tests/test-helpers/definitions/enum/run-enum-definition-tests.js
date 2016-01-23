var assert = require("assert");
var base_1 = require("./../base");
var ensure_not_null_1 = require("./../../ensure-not-null");
var run_enum_member_definition_tests_1 = require("./run-enum-member-definition-tests");
function runEnumDefinitionTests(definition, structure) {
    describe("enum " + structure.name, function () {
        ensure_not_null_1.ensureNotNull(definition, function () {
            structure.members = structure.members || [];
            base_1.runNamedDefinitionTests(definition, structure);
            base_1.runExportableDefinitionTests(definition, structure);
            base_1.runAmbientableDefinitionTests(definition, structure);
            it("should have " + structure.members.length + " member(s)", function () {
                assert.equal(definition.members.length, structure.members.length);
            });
            structure.members.forEach(function (memberStructure, i) {
                run_enum_member_definition_tests_1.runEnumMemberDefinitionTests(definition.members[i], memberStructure);
            });
        });
    });
}
exports.runEnumDefinitionTests = runEnumDefinitionTests;

//# sourceMappingURL=run-enum-definition-tests.js.map
