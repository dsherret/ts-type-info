import * as assert from "assert";
import {InterfaceTestStructure} from "./../../test-structures";
import {InterfaceDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runTypeParameteredDefinitionTests, runAmbientableDefinitionTests, runParentedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";
import {runInterfaceMethodDefinitionTests} from "./run-interface-method-definition-tests";
import {runInterfacePropertyDefinitionTests} from "./run-interface-property-definition-tests";
import {runInterfaceNewSignatureDefinitionTests} from "./run-interface-new-signature-definition-tests";
import {runTypeExpressionTests} from "./../../expressions";

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
            runParentedDefinitionTests(definition);

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
                    runTypeExpressionTests(definition.extendsTypeExpressions[i], extendTestStructure);
                });
            });
        });
    });
}
