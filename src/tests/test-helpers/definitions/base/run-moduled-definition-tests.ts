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

export function runModuledDefinitionTests(definition: ModuledDefinitions, structure: ModuledTestStructure) {
    structure.namespaces = structure.namespaces || [];
    structure.classes = structure.classes || [];
    structure.enums = structure.enums || [];
    structure.functions = structure.functions || [];
    structure.interfaces = structure.interfaces || [];
    structure.variables = structure.variables || [];
    structure.typeAliases = structure.typeAliases || [];
    structure.exports = structure.exports || [];

    describe("namespaces", () => {
        it("should have the expected number of namespaces", () => {
            assert.equal(definition.namespaces.length, structure.namespaces.length);
        });

        structure.namespaces.forEach((namespaceTestStructure, i) => {
            runNamespaceDefinitionTests(definition.namespaces[i], namespaceTestStructure);
        });
    });

    describe("classes", () => {
        it("should have the expected number of classes", () => {
            assert.equal(definition.classes.length, structure.classes.length);
        });

        structure.classes.forEach((classTestStructure, i) => {
            runClassDefinitionTests(definition.classes[i], classTestStructure);
        });
    });

    describe("interfaces", () => {
        it("should have the expected number of interfaces", () => {
            assert.equal(definition.interfaces.length, structure.interfaces.length);
        });

        structure.interfaces.forEach((interfaceTestStructure, i) => {
            runInterfaceDefinitionTests(definition.interfaces[i], interfaceTestStructure);
        });
    });

    describe("functions", () => {
        it("should have the expected number of functions", () => {
            assert.equal(definition.functions.length, structure.functions.length);
        });

        structure.functions.forEach((functionTestStructure, i) => {
            runFunctionDefinitionTests(definition.functions[i], functionTestStructure);
        });
    });

    describe("enums", () => {
        it("should have the expected number of enums", () => {
            assert.equal(definition.enums.length, structure.enums.length);
        });

        structure.enums.forEach((enumTestStructure, i) => {
            runEnumDefinitionTests(definition.enums[i], enumTestStructure);
        });
    });

    describe("variables", () => {
        it("should have the expected number of variables", () => {
            assert.equal(definition.variables.length, structure.variables.length);
        });

        structure.variables.forEach((variableTestStructure, i) => {
            runVariableDefinitionTests(definition.variables[i], variableTestStructure);
        });
    });

    describe("typeAliases", () => {
        it("should have the expected number of type aliases", () => {
            assert.equal(definition.typeAliases.length, structure.typeAliases.length);
        });

        structure.typeAliases.forEach((typeAliasTestStructure, i) => {
            runTypeAliasDefinitionTests(definition.typeAliases[i], typeAliasTestStructure);
        });
    });

    describe("exports", () => {
        it("should have the expected number of exports", () => {
            assert.equal(definition.exports.length, structure.exports.length);
        });

        structure.exports.forEach((exportTestStructure, i) => {
            // defaults
            exportTestStructure.isExported = exportTestStructure.isExported == null ? true : exportTestStructure.isExported;
            exportTestStructure.isNamedExportOfFile = exportTestStructure.isNamedExportOfFile == null ? false : exportTestStructure.isNamedExportOfFile;

            describe(`${exportTestStructure.name}`, () => {
                runNamedDefinitionTests(definition.exports[i], exportTestStructure);
                runExportableDefinitionTests(definition.exports[i], exportTestStructure);
            });
        });
    });
}
