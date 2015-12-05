var assert = require("assert");
var run_named_definition_tests_1 = require("./run-named-definition-tests");
var run_typed_definition_tests_1 = require("./run-typed-definition-tests");
function runParameterDefinitionTests(definition, param) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("parameter " + param.name, function () {
        run_named_definition_tests_1.runNamedDefinitionTests(definition, param.name);
        run_typed_definition_tests_1.runTypedDefinitionTests(definition, param.type);
        it("should be " + (!param.isRequired ? "required" : "not required"), function () {
            assert.equal(definition.isRequired, typeof param.isRequired === "boolean" ? param.isRequired : true);
        });
        it("should " + (param.isRestParameter ? "be" : "not be") + " a rest parameter", function () {
            assert.equal(definition.isRestParameter, typeof param.isRestParameter === "boolean" ? param.isRestParameter : false);
        });
    });
}
exports.runParameterDefinitionTests = runParameterDefinitionTests;

//# sourceMappingURL=run-parameter-definition-tests.js.map
