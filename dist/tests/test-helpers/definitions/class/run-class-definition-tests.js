var assert = require("assert");
var base_1 = require("./../base");
var run_class_property_definition_tests_1 = require("./run-class-property-definition-tests");
var run_class_method_definition_tests_1 = require("./run-class-method-definition-tests");
var run_class_static_property_definition_tests_1 = require("./run-class-static-property-definition-tests");
var run_class_static_method_definition_tests_1 = require("./run-class-static-method-definition-tests");
var run_constructor_definition_tests_1 = require("./run-constructor-definition-tests");
var expressions_1 = require("./../../expressions");
function runClassDefinitionTests(definition, structure) {
    structure.methods = structure.methods || [];
    structure.properties = structure.properties || [];
    structure.staticMethods = structure.staticMethods || [];
    structure.staticProperties = structure.staticProperties || [];
    structure.extendsTypeExpressions = structure.extendsTypeExpressions || [];
    structure.implementsTypeExpressions = structure.implementsTypeExpressions || [];
    base_1.runNamedDefinitionTests(definition, structure);
    base_1.runExportableDefinitionTests(definition, structure);
    base_1.runDecoratableDefinitionTests(definition, structure);
    base_1.runTypeParameteredDefinitionTests(definition, structure);
    base_1.runAmbientableDefinitionTests(definition, structure);
    run_constructor_definition_tests_1.runConstructorDefinitionTests(definition.constructorDef, structure.constructorDef);
    it("should " + (structure.isAbstract ? "be" : "not be") + " abstract.", function () {
        assert.equal(definition.isAbstract, structure.isAbstract || false);
    });
    describe("methods", function () {
        it("should have the expected number of methods", function () {
            assert.equal(definition.methods.length, structure.methods.length);
        });
        structure.methods.forEach(function (methodStructure, i) {
            run_class_method_definition_tests_1.runClassMethodDefinitionTests(definition.methods[i], methodStructure);
        });
    });
    describe("properties", function () {
        it("should have the expected number of properties", function () {
            assert.equal(definition.properties.length, structure.properties.length);
        });
        structure.properties.forEach(function (propertyStructure, i) {
            run_class_property_definition_tests_1.runClassPropertyDefinitionTests(definition.properties[i], propertyStructure);
        });
    });
    describe("staticMethods", function () {
        it("should have the expected number of staticMethods", function () {
            assert.equal(definition.staticMethods.length, structure.staticMethods.length);
        });
        structure.staticMethods.forEach(function (methodStructure, i) {
            run_class_static_method_definition_tests_1.runClassStaticMethodDefinitionTests(definition.staticMethods[i], methodStructure);
        });
    });
    describe("staticProperties", function () {
        it("should have the expected number of staticProperties", function () {
            assert.equal(definition.staticProperties.length, structure.staticProperties.length);
        });
        structure.staticProperties.forEach(function (propertyStructure, i) {
            run_class_static_property_definition_tests_1.runClassStaticPropertyDefinitionTests(definition.staticProperties[i], propertyStructure);
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
    describe("implements", function () {
        it("should have the expected number of implements", function () {
            assert.equal(definition.implementsTypeExpressions.length, structure.implementsTypeExpressions.length);
        });
        structure.implementsTypeExpressions.forEach(function (implementStructure, i) {
            expressions_1.runTypeExpressionTests(definition.implementsTypeExpressions[i], implementStructure);
        });
    });
}
exports.runClassDefinitionTests = runClassDefinitionTests;

//# sourceMappingURL=run-class-definition-tests.js.map
