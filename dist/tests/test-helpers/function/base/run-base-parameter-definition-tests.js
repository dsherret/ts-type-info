var assert = require("assert");
var base_1 = require("./../../base");
var expressions_1 = require("./../../expressions");
function runBaseParameterDefinitionTests(definition, structure) {
    base_1.runNamedDefinitionTests(definition, structure);
    base_1.runTypeExpressionedDefinitionTests(definition, structure);
    it("should be " + (structure.isOptional ? "optional" : "not optional"), function () {
        assert.equal(definition.isOptional, typeof structure.isOptional === "boolean" ? structure.isOptional : false);
    });
    it("should " + (structure.isRestParameter ? "be" : "not be") + " a rest parameter", function () {
        assert.equal(definition.isRestParameter, typeof structure.isRestParameter === "boolean" ? structure.isRestParameter : false);
    });
    if (structure.defaultExpression != null) {
        it("should have the default expression", function () {
            expressions_1.runExpressionTests(definition.defaultExpression, structure.defaultExpression);
        });
    }
    else {
        it("should not have a default expression.", function () {
            assert.equal(definition.defaultExpression, null);
        });
    }
}
exports.runBaseParameterDefinitionTests = runBaseParameterDefinitionTests;

//# sourceMappingURL=run-base-parameter-definition-tests.js.map
