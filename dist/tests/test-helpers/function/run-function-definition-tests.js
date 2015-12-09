var run_named_definition_tests_1 = require("./../base/run-named-definition-tests");
var run_return_typed_definition_tests_1 = require("./../function/run-return-typed-definition-tests");
var run_parametered_definition_tests_1 = require("./../function/run-parametered-definition-tests");
function runFunctionDefinitionTests(definition, func) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("method " + func.name, function () {
        run_named_definition_tests_1.runNamedDefinitionTests(definition, func.name);
        run_return_typed_definition_tests_1.runReturnTypedDefinitionTests(definition, func.returnType);
        run_parametered_definition_tests_1.runParameteredDefinitionTests(definition, func.parameters);
    });
}
exports.runFunctionDefinitionTests = runFunctionDefinitionTests;

//# sourceMappingURL=run-function-definition-tests.js.map
