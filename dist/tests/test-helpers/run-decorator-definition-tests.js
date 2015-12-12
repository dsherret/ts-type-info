var assert = require("assert");
var run_named_definition_tests_1 = require("./base/run-named-definition-tests");
function runDecoratorDefinitionTests(definition, decorator) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("decorator " + decorator.name, function () {
        run_named_definition_tests_1.runNamedDefinitionTests(definition, decorator.name);
        definition.arguments.forEach(function (argument, i) {
            it("should have a name of " + decorator.arguments[i].text, function () {
                assert.equal(argument.text, decorator.arguments[i].text);
            });
        });
    });
}
exports.runDecoratorDefinitionTests = runDecoratorDefinitionTests;

//# sourceMappingURL=run-decorator-definition-tests.js.map
