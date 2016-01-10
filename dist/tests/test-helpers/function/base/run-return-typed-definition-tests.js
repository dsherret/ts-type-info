var expressions_1 = require("./../../expressions");
function runReturnTypedDefinitionTests(definition, name) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    expressions_1.runTypeExpressionTests(definition.returnTypeExpression, name);
}
exports.runReturnTypedDefinitionTests = runReturnTypedDefinitionTests;

//# sourceMappingURL=run-return-typed-definition-tests.js.map
