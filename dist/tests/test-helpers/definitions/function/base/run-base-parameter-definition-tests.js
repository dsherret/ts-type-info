var assert = require("assert");
var base_1 = require("./../../base");
function runBaseParameterDefinitionTests(definition, structure) {
    base_1.runNamedDefinitionTests(definition, structure);
    base_1.runTypeExpressionedDefinitionTests(definition, structure);
    base_1.runDefaultExpressionedDefinitionTests(definition, structure);
    it("should be " + (structure.isOptional ? "optional" : "not optional"), function () {
        assert.equal(definition.isOptional, typeof structure.isOptional === "boolean" ? structure.isOptional : false);
    });
    it("should " + (structure.isRestParameter ? "be" : "not be") + " a rest parameter", function () {
        assert.equal(definition.isRestParameter, typeof structure.isRestParameter === "boolean" ? structure.isRestParameter : false);
    });
}
exports.runBaseParameterDefinitionTests = runBaseParameterDefinitionTests;

//# sourceMappingURL=run-base-parameter-definition-tests.js.map
