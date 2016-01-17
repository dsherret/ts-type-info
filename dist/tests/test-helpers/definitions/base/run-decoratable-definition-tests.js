var assert = require("assert");
var general_1 = require("./../general");
function runDecoratableDefinitionTests(definition, structure) {
    describe("decorators", function () {
        structure.decorators = structure.decorators || [];
        it("should have " + structure.decorators.length + " parameters", function () {
            assert.equal(definition.decorators.length, structure.decorators.length);
        });
        structure.decorators.forEach(function (decoratorStructure, i) {
            general_1.runDecoratorDefinitionTests(definition.decorators[i], structure.decorators[i]);
        });
    });
}
exports.runDecoratableDefinitionTests = runDecoratableDefinitionTests;

//# sourceMappingURL=run-decoratable-definition-tests.js.map
