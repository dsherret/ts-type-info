var base_1 = require("./base");
function runStaticPropertyDefinitionTests(definition, structure) {
    describe("property " + structure.name, function () {
        base_1.runBaseClassPropertyDefinitionTests(definition, structure);
    });
}
exports.runStaticPropertyDefinitionTests = runStaticPropertyDefinitionTests;

//# sourceMappingURL=run-static-property-definition-tests.js.map
