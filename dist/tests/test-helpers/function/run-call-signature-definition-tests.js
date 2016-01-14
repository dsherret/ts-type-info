var assert = require("assert");
var base_1 = require("./base");
var base_2 = require("./../base");
var run_parameter_definition_tests_1 = require("./run-parameter-definition-tests");
function runCallSignatureDefinitionTests(definition, structure) {
    describe("call signature", function () {
        base_2.runTypeParameteredDefinitionTests(definition, structure);
        base_1.runParameteredDefinitionTests(run_parameter_definition_tests_1.runParameterDefinitionTests, definition, structure);
        base_1.runReturnTypedDefinitionTests(definition, structure);
        it("should have a minimum argument count of " + (structure.minArgumentCount || 0), function () {
            assert.equal(definition.minArgumentCount, structure.minArgumentCount || 0);
        });
    });
}
exports.runCallSignatureDefinitionTests = runCallSignatureDefinitionTests;

//# sourceMappingURL=run-call-signature-definition-tests.js.map
