import * as assert from "assert";
import {InterfaceStructure} from "./../../structures";
import {InterfaceDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runTypeParameteredDefinitionTests, runAmbientableDefinitionTests, runParentedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";
import {runInterfaceMethodDefinitionTests} from "./run-interface-method-definition-tests";
import {runInterfacePropertyDefinitionTests} from "./run-interface-property-definition-tests";
import {runInterfaceNewSignatureDefinitionTests} from "./run-interface-new-signature-definition-tests";
import {runTypeExpressionTests} from "./../../expressions";

export function runInterfaceDefinitionTests(definition: InterfaceDefinition, structure: InterfaceStructure) {
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

                structure.methods.forEach((methodStructure, i) => {
                    runInterfaceMethodDefinitionTests(definition.methods[i], methodStructure);
                });
            });

            describe("newSignatures", () => {
                it("should have the expected number of newSignatures", () => {
                    assert.equal(definition.newSignatures.length, structure.newSignatures.length);
                });

                structure.newSignatures.forEach((newSignatureStructure, i) => {
                    runInterfaceNewSignatureDefinitionTests(definition.newSignatures[i], newSignatureStructure);
                });
            });

            describe("properties", () => {
                it("should have the expected number of properties", () => {
                    assert.equal(definition.properties.length, structure.properties.length);
                });

                structure.properties.forEach((propertyStructure, i) => {
                    runInterfacePropertyDefinitionTests(definition.properties[i], propertyStructure);
                });
            });

            describe("extends", () => {
                it("should have the expected number of extends", () => {
                    assert.equal(definition.extendsTypeExpressions.length, structure.extendsTypeExpressions.length);
                });

                structure.extendsTypeExpressions.forEach((extendStructure, i) => {
                    runTypeExpressionTests(definition.extendsTypeExpressions[i], extendStructure);
                });
            });
        });
    });
}
