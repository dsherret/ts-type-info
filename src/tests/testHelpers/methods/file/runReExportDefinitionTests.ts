import * as assert from "assert";
import {ReExportTestStructure} from "./../../testStructures";
import {ReExportDefinition} from "./../../../../definitions";
import {ensureNotNull} from "./../../ensureNotNull";
import {runReExportPartDefinitionTests} from "./runReExportPartDefinitionTests";

export function runReExportDefinitionTests(definition: ReExportDefinition, structure: ReExportTestStructure) {
    describe(`re-export ${structure.moduleSpecifier}`, () => {
        ensureNotNull(definition, () => {
            it(`should have a module specifier text of ${structure.moduleSpecifier}`, () => {
                assert.equal(definition.moduleSpecifier, structure.moduleSpecifier);
            });

            it(`should have a file name that ends with ${structure.fileName}`, () => {
                const defFileName = definition.fileName || "";
                assert.equal(defFileName.substr(defFileName.length - structure.fileName.length), structure.fileName);
            });

            describe("star exports", () => {
                it(`should have the expected number of star exports`, () => {
                    assert.equal(definition.starExports.length, structure.starExports.length);
                });

                structure.starExports.forEach((exportPartStructure, i) => {
                    runReExportPartDefinitionTests(definition.starExports[i], exportPartStructure);
                });
            });

            describe("named exports", () => {
                it(`should have the expected number of named exports`, () => {
                    assert.equal(definition.namedExports.length, structure.namedExports.length);
                });

                structure.namedExports.forEach((exportPartStructure, i) => {
                    runReExportPartDefinitionTests(definition.namedExports[i], exportPartStructure);
                });
            });
        });
    });
}
