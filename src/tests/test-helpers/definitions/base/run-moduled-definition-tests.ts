import * as assert from "assert";
import {ModuledDefinitions} from "./../../../../definitions";
import {runNamespaceDefinitionTests} from "./../namespace";
import {runInterfaceDefinitionTests} from "./../interface";
import {runFunctionDefinitionTests} from "./../function";
import {runEnumDefinitionTests} from "./../enum";
import {runClassDefinitionTests} from "./../class";
import {runVariableDefinitionTests} from "./../variable";
import {runTypeAliasDefinitionTests} from "./../general";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runExportableDefinitionTests} from "./run-exportable-definition-tests";
import {ModuledTestStructure} from "./../../test-structures";

export function runModuledDefinitionTests(definition: ModuledDefinitions, expected: ModuledTestStructure) {
    expected.namespaces = expected.namespaces || [];
    expected.classes = expected.classes || [];
    expected.enums = expected.enums || [];
    expected.functions = expected.functions || [];
    expected.interfaces = expected.interfaces || [];
    expected.variables = expected.variables || [];
    expected.typeAliases = expected.typeAliases || [];
    expected.exports = expected.exports || [];

    describe("namespaces", () => {
        it("should have the expected number of namespaces", () => {
            assert.equal(definition.namespaces.length, expected.namespaces.length);
        });

        expected.namespaces.forEach((namespaceTestStructure, i) => {
            runNamespaceDefinitionTests(definition.namespaces[i], namespaceTestStructure);
        });
    });

    describe("classes", () => {
        it("should have the expected number of classes", () => {
            assert.equal(definition.classes.length, expected.classes.length);
        });

        expected.classes.forEach((classTestStructure, i) => {
            runClassDefinitionTests(definition.classes[i], classTestStructure);
        });
    });

    describe("interfaces", () => {
        it("should have the expected number of interfaces", () => {
            assert.equal(definition.interfaces.length, expected.interfaces.length);
        });

        expected.interfaces.forEach((interfaceTestStructure, i) => {
            runInterfaceDefinitionTests(definition.interfaces[i], interfaceTestStructure);
        });
    });

    describe("functions", () => {
        it("should have the expected number of functions", () => {
            assert.equal(definition.functions.length, expected.functions.length);
        });

        expected.functions.forEach((functionTestStructure, i) => {
            runFunctionDefinitionTests(definition.functions[i], functionTestStructure);
        });
    });

    describe("enums", () => {
        it("should have the expected number of enums", () => {
            assert.equal(definition.enums.length, expected.enums.length);
        });

        expected.enums.forEach((enumTestStructure, i) => {
            runEnumDefinitionTests(definition.enums[i], enumTestStructure);
        });
    });

    describe("variables", () => {
        it("should have the expected number of variables", () => {
            assert.equal(definition.variables.length, expected.variables.length);
        });

        expected.variables.forEach((variableTestStructure, i) => {
            runVariableDefinitionTests(definition.variables[i], variableTestStructure);
        });
    });

    describe("typeAliases", () => {
        it("should have the expected number of type aliases", () => {
            assert.equal(definition.typeAliases.length, expected.typeAliases.length);
        });

        expected.typeAliases.forEach((typeAliasTestStructure, i) => {
            runTypeAliasDefinitionTests(definition.typeAliases[i], typeAliasTestStructure);
        });
    });

    describe("exports", () => {
        it("should have the expected number of exports", () => {
            assert.equal(definition.exports.length, expected.exports.length);
        });

        expected.exports.forEach((exportTestStructure, i) => {
            // defaults
            exportTestStructure.isExported = exportTestStructure.isExported == null ? true : exportTestStructure.isExported;
            exportTestStructure.isNamedExportOfFile = exportTestStructure.isNamedExportOfFile == null ? false : exportTestStructure.isNamedExportOfFile;

            runNamedDefinitionTests(definition.exports[i], exportTestStructure);
            runExportableDefinitionTests(definition.exports[i], exportTestStructure);
        });
    });
}
