var assert = require("assert");
var run_named_definition_tests_1 = require("./run-named-definition-tests");
var namespace_1 = require("./../namespace");
function runModuledDefinitionTests(definition, expected) {
    if (definition == null) {
        throw "Moduled definition should not be null.";
    }
    runNameArrayTests(definition.classes, expected.classNames);
    runNameArrayTests(definition.interfaces, expected.interfaceNames);
    runNameArrayTests(definition.functions, expected.functionNames);
    runNameArrayTests(definition.enums, expected.enumNames);
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
function runNameArrayTests(definitions, expectedNames) {
    expectedNames = expectedNames || [];
    it("should have the expected number of definitions", function () {
        assert.equal(definitions.length, expectedNames.length);
    });
    expectedNames.forEach(function (name, i) {
        run_named_definition_tests_1.runNamedDefinitionTests(definitions[i], name);
    });
}

//# sourceMappingURL=run-moduled-definition-tests.js.map
