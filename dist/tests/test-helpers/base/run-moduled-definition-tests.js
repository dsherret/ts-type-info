var assert = require("assert");
var run_named_definition_tests_1 = require("./run-named-definition-tests");
var run_exportable_definition_tests_1 = require("./run-exportable-definition-tests");
var namespace_1 = require("./../namespace");
function runModuledDefinitionTests(definition, expected) {
    if (definition == null) {
        throw "Moduled definition should not be null.";
    }
    describe("classes", function () {
        runNameArrayTests(definition.classes, expected.classes);
    });
    describe("interfaces", function () {
        runNameArrayTests(definition.interfaces, expected.interfaces);
    });
    describe("functions", function () {
        runNameArrayTests(definition.functions, expected.functions);
    });
    describe("enums", function () {
        runNameArrayTests(definition.enums, expected.enums);
    });
    it("should have the expected number of namespaces", function () {
        assert.equal(definition.namespaces.length, (expected.namespaces || []).length);
    });
    (expected.namespaces || []).forEach(function (namespace, i) {
        describe(namespace.name, function () {
            namespace_1.runNamespaceDefinitionTests(definition.namespaces[i], namespace);
        });
    });
}
exports.runModuledDefinitionTests = runModuledDefinitionTests;
function runNameArrayTests(definitions, expected) {
    expected = expected || [];
    it("should have the expected number of definitions", function () {
        assert.equal(definitions.length, expected.length);
    });
    expected.forEach(function (item, i) {
        describe(item.name, function () {
            run_named_definition_tests_1.runNamedDefinitionTests(definitions[i], item.name);
            run_exportable_definition_tests_1.runExportableDefinitionTests(definitions[i], item.isExported);
        });
    });
}

//# sourceMappingURL=run-moduled-definition-tests.js.map
