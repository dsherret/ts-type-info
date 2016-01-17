var base_1 = require("./../../base");
var general_1 = require("./../../general");
function runBaseClassPropertyDefinitionTests(definition, structure) {
    general_1.runObjectPropertyDefinitionTests(definition, structure);
    base_1.runScopedDefinitionTests(definition, structure);
}
exports.runBaseClassPropertyDefinitionTests = runBaseClassPropertyDefinitionTests;

//# sourceMappingURL=run-base-class-property-definition-tests.js.map
