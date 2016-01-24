var assert = require("assert");
var base_1 = require("./../base");
var ensure_not_null_1 = require("./../../ensure-not-null");
var run_interface_method_definition_tests_1 = require("./run-interface-method-definition-tests");
var run_interface_property_definition_tests_1 = require("./run-interface-property-definition-tests");
var run_interface_new_signature_definition_tests_1 = require("./run-interface-new-signature-definition-tests");
var expressions_1 = require("./../../expressions");
function runInterfaceDefinitionTests(definition, structure) {
    ensure_not_null_1.ensureNotNull(definition, function () {
        structure.methods = structure.methods || [];
        structure.newSignatures = structure.newSignatures || [];
        structure.properties = structure.properties || [];
        structure.extendsTypeExpressions = structure.extendsTypeExpressions || [];
        // interfaces should always be ambient
        structure.isAmbient = structure.isAmbient == null ? true : structure.isAmbient;
        base_1.runNamedDefinitionTests(definition, structure);
        base_1.runExportableDefinitionTests(definition, structure);
        base_1.runAmbientableDefinitionTests(definition, structure);
        base_1.runTypeParameteredDefinitionTests(definition, structure);
        describe("methods", function () {
            it("should have the expected number of methods", function () {
                assert.equal(definition.methods.length, structure.methods.length);
            });
            structure.methods.forEach(function (methodStructure, i) {
                run_interface_method_definition_tests_1.runInterfaceMethodDefinitionTests(definition.methods[i], methodStructure);
            });
        });
        describe("newSignatures", function () {
            it("should have the expected number of newSignatures", function () {
                assert.equal(definition.newSignatures.length, structure.newSignatures.length);
            });
            structure.newSignatures.forEach(function (newSignatureStructure, i) {
                run_interface_new_signature_definition_tests_1.runInterfaceNewSignatureDefinitionTests(definition.newSignatures[i], newSignatureStructure);
            });
        });
        describe("properties", function () {
            it("should have the expected number of properties", function () {
                assert.equal(definition.properties.length, structure.properties.length);
            });
            structure.properties.forEach(function (propertyStructure, i) {
                run_interface_property_definition_tests_1.runInterfacePropertyDefinitionTests(definition.properties[i], propertyStructure);
            });
        });
        describe("extends", function () {
            it("should have the expected number of extends", function () {
                assert.equal(definition.extendsTypeExpressions.length, structure.extendsTypeExpressions.length);
            });
            structure.extendsTypeExpressions.forEach(function (extendStructure, i) {
                expressions_1.runTypeExpressionTests(definition.extendsTypeExpressions[i], extendStructure);
            });
        });
    });
}
exports.runInterfaceDefinitionTests = runInterfaceDefinitionTests;

//# sourceMappingURL=run-interface-definition-tests.js.map
