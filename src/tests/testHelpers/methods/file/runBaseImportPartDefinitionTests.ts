import * as assert from "assert";
import {BaseImportPartDefinition} from "./../../../../definitions";
import {BaseImportPartTestStructure} from "./../../testStructures";
import {ensureNotNull} from "./../../ensureNotNull";
import {runExpressionDefinitionTests} from "./../expressions";
import {runBaseDefinitionTests} from "./../base";

export function runBaseImportPartDefinitionTests(definition: BaseImportPartDefinition, structure: BaseImportPartTestStructure) {
    structure.definitions = structure.definitions || [];

    runBaseDefinitionTests(definition, structure);

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

                if (structureDefinition.type != null) {
                    it(`should have a matching type`, () => {
                        assert.equal(definitionDefinition instanceof structureDefinition.type, true);
                    });
                }
            });
        });
    });

    describe("expression", () => {
        runExpressionDefinitionTests(definition.expression, structure.expression);
    });
}
