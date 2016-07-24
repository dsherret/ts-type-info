import * as assert from "assert";
import {ImportTestStructure} from "./../../testStructures";
import {ImportDefinition} from "./../../../../definitions";
import {ensureNotNull} from "./../../ensureNotNull";
import {runBaseDefinitionTests} from "./../base";
import {runDefaultImportPartDefinitionTests} from "./runDefaultImportPartDefinitionTests";
import {runNamedImportPartDefinitionTests} from "./runNamedImportPartDefinitionTests";
import {runStarImportPartDefinitionTests} from "./runStarImportPartDefinitionTests";

export function runImportDefinitionTests(definition: ImportDefinition, structure: ImportTestStructure) {
    describe(`import ${structure.moduleSpecifier}`, () => {
        structure.namedImports = structure.namedImports || [];
        structure.starImports = structure.starImports || [];
        structure.fileName = "";

        ensureNotNull(definition, () => {
            runBaseDefinitionTests(definition, structure);

            it(`should have module specifier text ${structure.moduleSpecifier}`, () => {
                assert.equal(definition.moduleSpecifier, structure.moduleSpecifier);
            });

            it(`should have file name that ends with ${structure.fileName}`, () => {
                const defFileName = definition.fileName || "";
                assert.equal(defFileName.substr(defFileName.length - structure.fileName.length), structure.fileName);
            });

            it(`should have star import name ${structure.starImportName}`, () => {
                assert.equal(definition.starImportName, structure.starImportName);
            });

            describe(`default import`, () => {
                runDefaultImportPartDefinitionTests(definition.defaultImport, structure.defaultImport);
            });

            describe("named imports", () => {
                it(`should have the same number of named imports`, () => {
                    assert.equal(definition.namedImports.length, structure.namedImports.length);
                });

                structure.namedImports.forEach((namedImportStructure, i) => {
                    runNamedImportPartDefinitionTests(definition.namedImports[i], namedImportStructure);
                });
            });

            describe("star imports", () => {
                it(`should have the same number of star imports`, () => {
                    assert.equal(definition.starImports.length, structure.starImports.length);
                });

                structure.starImports.forEach((starImportStructure, i) => {
                    runStarImportPartDefinitionTests(definition.starImports[i], starImportStructure);
                });
            });
        });
    });
}
