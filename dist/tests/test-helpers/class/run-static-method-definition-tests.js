var run_named_definition_tests_1 = require("./../run-named-definition-tests");
var run_return_typed_definition_tests_1 = require("./../function/run-return-typed-definition-tests");
var run_parametered_definition_tests_1 = require("./../function/run-parametered-definition-tests");
function runStaticMethodDefinitionTests(definition, method) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("static method " + method.name, function () {
        run_named_definition_tests_1.runNamedDefinitionTests(definition, method.name);
        run_return_typed_definition_tests_1.runReturnTypedDefinitionTests(definition, method.returnType);
        run_parametered_definition_tests_1.runParameteredDefinitionTests(definition, method.parameters);
    });
}
exports.runStaticMethodDefinitionTests = runStaticMethodDefinitionTests;

//# sourceMappingURL=run-static-method-definition-tests.js.map
