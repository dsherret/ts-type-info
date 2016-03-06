import * as assert from "assert";
import {ImportTestStructure, ExpressionTestStructure} from "./../../test-structures";
import {ImportDefinition, ExportableDefinitions} from "./../../../../definitions";
import {Expression} from "./../../../../expressions";
import {ArrayExt} from "./../../../../utils";
import {runExpressionTests} from "./../../expressions";
import {runParentedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runImportDefinitionTests(definition: ImportDefinition, structure: ImportTestStructure) {
    describe(`import ${structure.moduleSpecifier}`, () => {
        ensureNotNull(definition, () => {
            runParentedDefinitionTests(definition);

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
                runImportPartTests(definition.defaultImport, structure.defaultImport);
            });

            describe("named imports", () => {
                it(`should have the same number of named imports`, () => {
                    assert.equal(definition.namedImports.length, structure.namedImports.length);
                });

                structure.namedImports.forEach((namedImportStructure, i) => {
                    runImportPartTests(definition.namedImports[i], namedImportStructure);
                });
            });

            describe("star imports", () => {
                it(`should have the same number of star imports`, () => {
                    assert.equal(definition.starImports.length, structure.starImports.length);
                });

                structure.starImports.forEach((starImportStructure, i) => {
                    runImportPartTests(definition.starImports[i], starImportStructure);
                });
            });
        });
    });
}

function runImportPartTests(
    definition: { importName: string; definitions: ArrayExt<ExportableDefinitions>; expression: Expression; },
    structure: { importName: string; definitions: { name: string, type: any }[]; expression: ExpressionTestStructure; }
) {
    if (structure == null) {
        it(`should be null`, () => {
            assert.equal(definition, null);
        });
    }
    else {
        ensureNotNull(definition, () => {
            it(`should have import name ${structure.importName}`, () => {
                assert.equal(definition.importName, structure.importName);
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
