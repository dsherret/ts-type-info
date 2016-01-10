var expressions_1 = require("./../expressions");
function runTypedDefinitionTests(definition, name) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    expressions_1.runTypeExpressionTests(definition.typeExpression, name);
}
exports.runTypedDefinitionTests = runTypedDefinitionTests;

//# sourceMappingURL=run-typed-definition-tests.js.map
