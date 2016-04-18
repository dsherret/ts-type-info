import * as assert from "assert";
import {InterfaceTestStructure} from "./../../testStructures";
import {InterfaceDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runTypeParameteredDefinitionTests, runAmbientableDefinitionTests} from "./../base";
import {runCallSignatureDefinitionTests, runIndexSignatureDefinitionTests} from "./../general";
import {ensureNotNull} from "./../../ensureNotNull";
import {runInterfaceMethodDefinitionTests} from "./runInterfaceMethodDefinitionTests";
import {runInterfacePropertyDefinitionTests} from "./runInterfacePropertyDefinitionTests";
import {runTypeExpressionDefinitionTests} from "./../expressions";

export function runInterfaceDefinitionTests(definition: InterfaceDefinition, structure: InterfaceTestStructure) {
    describe(`interface ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.methods = structure.methods || [];
            structure.newSignatures = structure.newSignatures || [];
            structure.callSignatures = structure.callSignatures || [];
            structure.indexSignatures = structure.indexSignatures || [];
            structure.properties = structure.properties || [];
            structure.extendsTypeExpressions = structure.extendsTypeExpressions || [];
            // interfaces should always be ambient
            structure.isAmbient = structure.isAmbient == null ? true : structure.isAmbient;

            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runTypeParameteredDefinitionTests(definition, structure);

            describe("callSignatures", () => {
                it("should have the expected number of callSignatures", () => {
                    assert.equal(definition.callSignatures.length, structure.callSignatures.length);
                });

                structure.callSignatures.forEach((callSignatureTestStructure, i) => {
                    runCallSignatureDefinitionTests(definition.callSignatures[i], callSignatureTestStructure);
                });
            });

            describe("indexSignatures", () => {
                it("should have the expected number of indexSignatures", () => {
                    assert.equal(definition.indexSignatures.length, structure.indexSignatures.length);
                });

                structure.indexSignatures.forEach((indexSignatureTestStructure, i) => {
                    runIndexSignatureDefinitionTests(definition.indexSignatures[i], indexSignatureTestStructure);
                });
            });

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
                    runCallSignatureDefinitionTests(definition.newSignatures[i], newSignatureTestStructure);
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
