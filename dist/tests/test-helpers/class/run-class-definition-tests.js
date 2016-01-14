var assert = require("assert");
var base_1 = require("./../base");
var run_class_property_definition_tests_1 = require("./run-class-property-definition-tests");
var run_class_method_definition_tests_1 = require("./run-class-method-definition-tests");
var run_static_property_definition_tests_1 = require("./run-static-property-definition-tests");
var run_static_method_definition_tests_1 = require("./run-static-method-definition-tests");
var run_constructor_definition_tests_1 = require("./run-constructor-definition-tests");
var expressions_1 = require("./../expressions");
function runClassDefinitionTests(definition, structure) {
    structure.methods = structure.methods || [];
    structure.properties = structure.properties || [];
    structure.staticMethods = structure.staticMethods || [];
    structure.staticProperties = structure.staticProperties || [];
    structure.extends = structure.extends || [];
    structure.implements = structure.implements || [];
    base_1.runNamedDefinitionTests(definition, structure);
    base_1.runExportableDefinitionTests(definition, structure);
    base_1.runDecoratableDefinitionTests(definition, structure);
    base_1.runTypeParameteredDefinitionTests(definition, structure);
    run_constructor_definition_tests_1.runConstructorDefinitionTests(definition.constructorDef, structure.constructorDef);
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
            run_static_method_definition_tests_1.runStaticMethodDefinitionTests(definition.staticMethods[i], methodStructure);
        });
    });
    describe("staticProperties", function () {
        it("should have the expected number of staticProperties", function () {
            assert.equal(definition.staticProperties.length, structure.staticProperties.length);
        });
        structure.staticProperties.forEach(function (propertyStructure, i) {
            run_static_property_definition_tests_1.runStaticPropertyDefinitionTests(definition.staticProperties[i], propertyStructure);
        });
    });
    describe("extends", function () {
        it("should have the expected number of extends", function () {
            assert.equal(definition.extends.length, structure.extends.length);
        });
        structure.extends.forEach(function (extendStructure, i) {
            expressions_1.runTypeExpressionTests(definition.extends[i], extendStructure);
        });
    });
    describe("implements", function () {
        it("should have the expected number of implements", function () {
            assert.equal(definition.implements.length, structure.implements.length);
        });
        structure.implements.forEach(function (implementStructure, i) {
            expressions_1.runTypeExpressionTests(definition.implements[i], implementStructure);
        });
    });
}
exports.runClassDefinitionTests = runClassDefinitionTests;

//# sourceMappingURL=run-class-definition-tests.js.map
