import * as assert from "assert";
import {IModuledDefinition} from "./../../../definitions";
import {runNamespaceDefinitionTests} from "./../namespace";
import {runInterfaceDefinitionTests} from "./../interface";
import {runFunctionDefinitionTests} from "./../function";
import {runEnumDefinitionTests} from "./../enum";
import {runClassDefinitionTests} from "./../class";
import {ModuledStructure} from "./../structures";

export function runModuledDefinitionTests(definition: IModuledDefinition, expected: ModuledStructure) {
    expected.classes = expected.classes || [];
    expected.enums = expected.enums || [];
    expected.functions = expected.functions || [];
    expected.interfaces = expected.interfaces || [];
    expected.namespaces = expected.namespaces || [];

    describe("classes", () => {
        it("should have the expected number of classes", () => {
            assert.equal(definition.classes.length, expected.classes.length);
        });

        expected.classes.forEach((classStructure, i) => {
            runClassDefinitionTests(definition.classes[i], classStructure);
        });
    });

    describe("interfaces", () => {
        it("should have the expected number of interfaces", () => {
            assert.equal(definition.interfaces.length, expected.interfaces.length);
        });

        expected.interfaces.forEach((interfaceStructure, i) => {
            runInterfaceDefinitionTests(definition.interfaces[i], interfaceStructure);
        });
    });

    describe("functions", () => {
        it("should have the expected number of functions", () => {
            assert.equal(definition.functions.length, expected.functions.length);
        });

        expected.functions.forEach((functionStructure, i) => {
            runFunctionDefinitionTests(definition.functions[i], functionStructure);
        });
    });

    describe("enums", () => {
        it("should have the expected number of enums", () => {
            assert.equal(definition.enums.length, expected.enums.length);
        });

        expected.enums.forEach((enumStructure, i) => {
            runEnumDefinitionTests(definition.enums[i], enumStructure);
        });
    });

    describe("namespaces", () => {
        it("should have the expected number of namespaces", () => {
            assert.equal(definition.namespaces.length, expected.namespaces.length);
        });

        expected.namespaces.forEach((namespaceStructure, i) => {
            runNamespaceDefinitionTests(definition.namespaces[i], namespaceStructure);
        });
    });
}
