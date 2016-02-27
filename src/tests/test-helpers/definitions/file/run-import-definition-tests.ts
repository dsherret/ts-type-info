import * as assert from "assert";
import {ImportTestStructure} from "./../../test-structures";
import {ImportDefinition} from "./../../../../definitions";
import {runParentedDefinitionTests, runNamedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runImportDefinitionTests(definition: ImportDefinition, importTestStructure: ImportTestStructure) {
    describe(`import ${importTestStructure.definitionName}`, () => {
        ensureNotNull(definition, () => {
            runParentedDefinitionTests(definition);
            runNamedDefinitionTests(definition, importTestStructure);

            it(`should have a import type of ${importTestStructure.importType}`, () => {
                assert.equal(definition.importType, importTestStructure.importType);
            });

            it(`should have a module specifier text of ${importTestStructure.moduleSpecifier}`, () => {
                assert.equal(definition.moduleSpecifier, importTestStructure.moduleSpecifier);
            });

            describe("definition", () => {
                it(`should have the name ${importTestStructure.definitionName}`, () => {
                    assert.equal(definition.definition.name, importTestStructure.definitionName);
                });

                it(`should have a matching type`, () => {
                    assert.equal(definition.definition instanceof importTestStructure.definitionType, true);
                });
            });
        });
    });
}
