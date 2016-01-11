import * as assert from "assert";
import {IModuledDefinition, INamedDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runNamespaceDefinitionTests} from "./../namespace";
import {Moduled} from "./../structures";

export function runModuledDefinitionTests(definition: IModuledDefinition, expected: Moduled) {
    if (definition == null) {
        throw "Moduled definition should not be null.";
    }

    runNameArrayTests(definition.classes, expected.classNames);
    runNameArrayTests(definition.interfaces, expected.interfaceNames);
    runNameArrayTests(definition.functions, expected.functionNames);
    runNameArrayTests(definition.enums, expected.enumNames);

    it("should have the expected number of namespaces", () => {
        assert.equal(definition.namespaces.length, (expected.namespaces || []).length);
    });

    (expected.namespaces || []).forEach((namespace, i) => {
        describe(namespace.name, () => {
            runNamespaceDefinitionTests(definition.namespaces[i], namespace);
        });
    });
}

function runNameArrayTests(definitions: INamedDefinition[], expectedNames: string[]) {
    expectedNames = expectedNames || [];

    it("should have the expected number of definitions", () => {
        assert.equal(definitions.length, expectedNames.length);
    });

    expectedNames.forEach((name, i) => {
        runNamedDefinitionTests(definitions[i], name);
    });
}
