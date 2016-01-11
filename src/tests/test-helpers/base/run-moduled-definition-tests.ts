import * as assert from "assert";
import {IModuledDefinition, INamedDefinition, IExportableDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runExportableDefinitionTests} from "./run-exportable-definition-tests";
import {runNamespaceDefinitionTests} from "./../namespace";
import {Moduled} from "./../structures";

export function runModuledDefinitionTests(definition: IModuledDefinition, expected: Moduled) {
    if (definition == null) {
        throw "Moduled definition should not be null.";
    }

    describe("classes", () => {
        runNameArrayTests(definition.classes, expected.classes);
    });

    describe("interfaces", () => {
        runNameArrayTests(definition.interfaces, expected.interfaces);
    });

    describe("functions", () => {
        runNameArrayTests(definition.functions, expected.functions);
    });

    describe("enums", () => {
        runNameArrayTests(definition.enums, expected.enums);
    });

    it("should have the expected number of namespaces", () => {
        assert.equal(definition.namespaces.length, (expected.namespaces || []).length);
    });

    (expected.namespaces || []).forEach((namespace, i) => {
        describe(namespace.name, () => {
            runNamespaceDefinitionTests(definition.namespaces[i], namespace);
        });
    });
}

function runNameArrayTests(definitions: (INamedDefinition & IExportableDefinition)[], expected: { name: string; isExported?: boolean }[]) {
    expected = expected || [];

    it("should have the expected number of definitions", () => {
        assert.equal(definitions.length, expected.length);
    });

    expected.forEach((item, i) => {
        describe(item.name, () => {
            runNamedDefinitionTests(definitions[i], item.name);
            runExportableDefinitionTests(definitions[i], item.isExported);
        });
    });
}
