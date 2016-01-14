var expressions_1 = require("./../../expressions");
function runTypeExpressionedDefinitionTests(definition, structure) {
    describe("typeExpression", function () {
        expressions_1.runTypeExpressionTests(definition.typeExpression, structure.typeExpression);
    });
}
exports.runTypeExpressionedDefinitionTests = runTypeExpressionedDefinitionTests;

//# sourceMappingURL=run-type-expressioned-definition-tests.js.map
