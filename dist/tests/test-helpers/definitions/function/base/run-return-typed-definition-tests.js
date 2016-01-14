var expressions_1 = require("./../../../expressions");
function runReturnTypedDefinitionTests(definition, structure) {
    describe("return type", function () {
        structure.returnTypeExpression = structure.returnTypeExpression || { text: "void" };
        expressions_1.runTypeExpressionTests(definition.returnTypeExpression, structure.returnTypeExpression);
    });
}
exports.runReturnTypedDefinitionTests = runReturnTypedDefinitionTests;

//# sourceMappingURL=run-return-typed-definition-tests.js.map
