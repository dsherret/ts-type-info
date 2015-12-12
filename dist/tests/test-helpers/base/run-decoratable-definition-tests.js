var assert = require("assert");
var run_decorator_definition_tests_1 = require("./../run-decorator-definition-tests");
function runDecoratableDefinitionTests(definition, decorators) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    it("should have " + decorators.length + " parameters", function () {
        assert.equal(definition.decorators.length, decorators.length);
    });
    definition.decorators.forEach(function (decorator, i) {
        run_decorator_definition_tests_1.runDecoratorDefinitionTests(decorator, decorators[i]);
    });
}
exports.runDecoratableDefinitionTests = runDecoratableDefinitionTests;

//# sourceMappingURL=run-decoratable-definition-tests.js.map
