import * as assert from "assert";
import {InterfaceTestStructure} from "./../../testStructures";
import {InterfaceDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runTypeParameteredDefinitionTests, runAmbientableDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensureNotNull";
import {runInterfaceMethodDefinitionTests} from "./runInterfaceMethodDefinitionTests";
import {runInterfacePropertyDefinitionTests} from "./runInterfacePropertyDefinitionTests";
import {runInterfaceNewSignatureDefinitionTests} from "./runInterfaceNewSignatureDefinitionTests";
import {runTypeExpressionDefinitionTests} from "./../expressions";

export function runInterfaceDefinitionTests(definition: InterfaceDefinition, structure: InterfaceTestStructure) {
    describe(`interface ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.methods = structure.methods || [];
            structure.newSignatures = structure.newSignatures || [];
            structure.properties = structure.properties || [];
            structure.extendsTypeExpressions = structure.extendsTypeExpressions || [];
            // interfaces should always be ambient
            structure.isAmbient = structure.isAmbient == null ? true : structure.isAmbient;

            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runTypeParameteredDefinitionTests(definition, structure);

            describe("methods", () => {
                it("should have the expected number of methods", () => {
                    assert.equal(definition.methods.length, structure.methods.length);
                });

                structure.methods.forEach((methodTestStructure, i) => {
                    runInterfaceMethodDefinitionTests(definition.methods[i], methodTestStructure);
                });
            });

            describe("newSignatures", () => {
                it("should have the expected number of newSignatures", () => {
                    assert.equal(definition.newSignatures.length, structure.newSignatures.length);
                });

                structure.newSignatures.forEach((newSignatureTestStructure, i) => {
                    runInterfaceNewSignatureDefinitionTests(definition.newSignatures[i], newSignatureTestStructure);
                });
            });

            describe("properties", () => {
                it("should have the expected number of properties", () => {
                    assert.equal(definition.properties.length, structure.properties.length);
                });

                structure.properties.forEach((propertyTestStructure, i) => {
                    runInterfacePropertyDefinitionTests(definition.properties[i], propertyTestStructure);
                });
            });

            describe("extends", () => {
                it("should have the expected number of extends", () => {
                    assert.equal(definition.extendsTypeExpressions.length, structure.extendsTypeExpressions.length);
                });

                structure.extendsTypeExpressions.forEach((extendTestStructure, i) => {
                    runTypeExpressionDefinitionTests(definition.extendsTypeExpressions[i], extendTestStructure);
                });
            });
        });
    });
}
