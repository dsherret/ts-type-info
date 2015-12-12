var run_named_definition_tests_1 = require("./../base/run-named-definition-tests");
var base_1 = require("./base");
function runFunctionDefinitionTests(definition, func) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("method " + func.name, function () {
        run_named_definition_tests_1.runNamedDefinitionTests(definition, func.name);
        base_1.runReturnTypedDefinitionTests(definition, func.returnType);
        base_1.runParameteredDefinitionTests(definition, func.parameters);
    });
}
exports.runFunctionDefinitionTests = runFunctionDefinitionTests;

//# sourceMappingURL=run-function-definition-tests.js.map
