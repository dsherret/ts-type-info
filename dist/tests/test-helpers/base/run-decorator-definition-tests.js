var assert = require("assert");
var run_named_definition_tests_1 = require("./run-named-definition-tests");
var expressions_1 = require("./../expressions");
function runDecoratorDefinitionTests(definition, structure) {
    describe("decorator " + structure.name, function () {
        structure.arguments = structure.arguments || [];
        run_named_definition_tests_1.runNamedDefinitionTests(definition, structure);
        it("should have " + structure.arguments.length + " argument(s)", function () {
            assert.equal(definition.arguments.length, structure.arguments.length);
        });
        structure.arguments.forEach(function (argumentStructure, i) {
            describe("argument " + argumentStructure.text, function () {
                expressions_1.runExpressionTests(definition.arguments[i], argumentStructure);
            });
        });
    });
}
exports.runDecoratorDefinitionTests = runDecoratorDefinitionTests;

//# sourceMappingURL=run-decorator-definition-tests.js.map
