var assert = require("assert");
var function_1 = require("./../function");
function runConstructorDefinitionTests(definition, constructor) {
    if (constructor == null) {
        it("should not have a constructor", function () {
            assert.equal(definition, null);
        });
    }
    else {
        it("should have a constructor", function () {
            assert.notEqual(definition, null);
        });
        function_1.runParameteredDefinitionTests(definition, constructor.parameters);
    }
}
exports.runConstructorDefinitionTests = runConstructorDefinitionTests;

//# sourceMappingURL=run-constructor-definition-tests.js.map
