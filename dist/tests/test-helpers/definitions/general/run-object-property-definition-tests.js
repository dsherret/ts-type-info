var base_1 = require("./../base");
function runObjectPropertyDefinitionTests(definition, structure) {
    describe("property " + structure.name, function () {
        base_1.runBasePropertyDefinitionTests(definition, structure);
        base_1.runDefaultExpressionedDefinitionTests(definition, structure);
    });
}
exports.runObjectPropertyDefinitionTests = runObjectPropertyDefinitionTests;

//# sourceMappingURL=run-object-property-definition-tests.js.map
