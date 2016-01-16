var base_1 = require("./../base");
function runInterfacePropertyDefinitionTests(definition, structure) {
    describe("property " + structure.name, function () {
        base_1.runBasePropertyDefinitionTests(definition, structure);
    });
}
exports.runInterfacePropertyDefinitionTests = runInterfacePropertyDefinitionTests;

//# sourceMappingURL=run-interface-property-definition-tests.js.map
