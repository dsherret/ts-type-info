var assert = require("assert");
var run_decorator_definition_tests_1 = require("./run-decorator-definition-tests");
function runDecoratableDefinitionTests(definition, structure) {
    describe("decorators", function () {
        structure.decorators = structure.decorators || [];
        it("should have " + structure.decorators.length + " parameters", function () {
            assert.equal(definition.decorators.length, structure.decorators.length);
        });
        structure.decorators.forEach(function (decoratorStructure, i) {
            run_decorator_definition_tests_1.runDecoratorDefinitionTests(definition.decorators[i], structure.decorators[i]);
        });
    });
}
exports.runDecoratableDefinitionTests = runDecoratableDefinitionTests;

//# sourceMappingURL=run-decoratable-definition-tests.js.map
