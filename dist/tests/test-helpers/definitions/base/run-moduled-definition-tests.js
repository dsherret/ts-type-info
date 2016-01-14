var assert = require("assert");
var namespace_1 = require("./../namespace");
var interface_1 = require("./../interface");
var function_1 = require("./../function");
var enum_1 = require("./../enum");
var class_1 = require("./../class");
function runModuledDefinitionTests(definition, expected) {
    expected.classes = expected.classes || [];
    expected.enums = expected.enums || [];
    expected.functions = expected.functions || [];
    expected.interfaces = expected.interfaces || [];
    expected.namespaces = expected.namespaces || [];
    describe("classes", function () {
        it("should have the expected number of classes", function () {
            assert.equal(definition.classes.length, expected.classes.length);
        });
        expected.classes.forEach(function (classStructure, i) {
            class_1.runClassDefinitionTests(definition.classes[i], classStructure);
        });
    });
    describe("interfaces", function () {
        it("should have the expected number of interfaces", function () {
            assert.equal(definition.interfaces.length, expected.interfaces.length);
        });
        expected.interfaces.forEach(function (interfaceStructure, i) {
            interface_1.runInterfaceDefinitionTests(definition.interfaces[i], interfaceStructure);
        });
    });
    describe("functions", function () {
        it("should have the expected number of functions", function () {
            assert.equal(definition.functions.length, expected.functions.length);
        });
        expected.functions.forEach(function (functionStructure, i) {
            function_1.runFunctionDefinitionTests(definition.functions[i], functionStructure);
        });
    });
    describe("enums", function () {
        it("should have the expected number of enums", function () {
            assert.equal(definition.enums.length, expected.enums.length);
        });
        expected.enums.forEach(function (enumStructure, i) {
            enum_1.runEnumDefinitionTests(definition.enums[i], enumStructure);
        });
    });
    describe("namespaces", function () {
        it("should have the expected number of namespaces", function () {
            assert.equal(definition.namespaces.length, expected.namespaces.length);
        });
        expected.namespaces.forEach(function (namespaceStructure, i) {
            namespace_1.runNamespaceDefinitionTests(definition.namespaces[i], namespaceStructure);
        });
    });
}
exports.runModuledDefinitionTests = runModuledDefinitionTests;

//# sourceMappingURL=run-moduled-definition-tests.js.map
