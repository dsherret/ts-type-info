import * as assert from "assert";
import {ReExportTestStructure, ExpressionTestStructure} from "./../../testStructures";
import {ReExportDefinition, ExportableDefinitions, ExpressionDefinition} from "./../../../../definitions";
import {ensureNotNull} from "./../../ensureNotNull";
import {runExpressionTests} from "./../expressions";
import {runParentedDefinitionTests} from "./../base";

export function runReExportDefinitionTests(definition: ReExportDefinition, structure: ReExportTestStructure) {
    describe(`re-export ${structure.moduleSpecifier}`, () => {
        runParentedDefinitionTests(definition);

        ensureNotNull(definition, () => {
            runParentedDefinitionTests(definition);

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
                    runImportPartTests(definition.starExports[i], exportPartStructure);
                });
            });

            describe("named exports", () => {
                it(`should have the expected number of named exports`, () => {
                    assert.equal(definition.namedExports.length, structure.namedExports.length);
                });

                structure.namedExports.forEach((exportPartStructure, i) => {
                    runImportPartTests(definition.namedExports[i], exportPartStructure);
                });
            });
        });
    });
}

function runImportPartTests(
    definition: { exportName: string; definitions: ExportableDefinitions[]; expression: ExpressionDefinition; },
    structure: { exportName: string; definitions: { name: string, type: any }[]; expression: ExpressionTestStructure; }
) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(definition, null);
        });
    }
    else {
        ensureNotNull(definition, () => {
            it(`should have export name ${structure.exportName}`, () => {
                assert.equal(definition.exportName, structure.exportName);
            });

            describe("definitions", () => {
                it(`should have the expected number of definitions`, () => {
                    assert.equal(definition.definitions.length, structure.definitions.length);
                });

                structure.definitions.forEach((structureDefinition, j) => {
                    const definitionDefinition = definition.definitions[j];

                    ensureNotNull(definitionDefinition, () => {
                        it(`should have the name ${structureDefinition.name}`, () => {
                            assert.equal(definitionDefinition.name, structureDefinition.name);
                        });

                        it(`should have a matching type`, () => {
                            assert.equal(definitionDefinition instanceof structureDefinition.type, true);
                        });
                    });
                });
            });

            describe("expression", () => {
                runExpressionTests(definition.expression, structure.expression);
            });
        });
    }
}
