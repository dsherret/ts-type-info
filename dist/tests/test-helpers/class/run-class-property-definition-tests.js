var assert = require("assert");
var base_1 = require("./../base");
function runClassPropertyDefinitionTests(definition, property) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("property " + property.name, function () {
        base_1.runPropertyDefinitionTests(definition, property);
        it("should be " + (property.isAccessor ? "an accessor" : "not an accessor"), function () {
            assert.equal(definition.isAccessor, property.isAccessor || false);
        });
        it("should be " + (property.isReadonly ? "readonly" : "not readonly"), function () {
            assert.equal(definition.isReadonly, property.isReadonly || false);
        });
    });
}
exports.runClassPropertyDefinitionTests = runClassPropertyDefinitionTests;

//# sourceMappingURL=run-class-property-definition-tests.js.map
