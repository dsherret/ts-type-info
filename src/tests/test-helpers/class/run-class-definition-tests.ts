import * as assert from "assert";
import {ClassStructure} from "./../structures";
import {ClassDefinition} from "./../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runDecoratableDefinitionTests, runTypeParameteredDefinitionTests} from "./../base";
import {runClassPropertyDefinitionTests} from "./run-class-property-definition-tests";
import {runClassMethodDefinitionTests} from "./run-class-method-definition-tests";
import {runStaticPropertyDefinitionTests} from "./run-static-property-definition-tests";
import {runStaticMethodDefinitionTests} from "./run-static-method-definition-tests";
import {runConstructorDefinitionTests} from "./run-constructor-definition-tests";
import {runTypeExpressionTests} from "./../expressions";

export function runClassDefinitionTests(definition: ClassDefinition, structure: ClassStructure) {
    structure.methods = structure.methods || [];
    structure.properties = structure.properties || [];
    structure.staticMethods = structure.staticMethods || [];
    structure.staticProperties = structure.staticProperties || [];
    structure.extends = structure.extends || [];
    structure.implements = structure.implements || [];

    runNamedDefinitionTests(definition, structure);
    runExportableDefinitionTests(definition, structure);
    runDecoratableDefinitionTests(definition, structure);
    runTypeParameteredDefinitionTests(definition, structure);
    runConstructorDefinitionTests(definition.constructorDef, structure.constructorDef);

    describe("methods", () => {
        it("should have the expected number of methods", () => {
            assert.equal(definition.methods.length, structure.methods.length);
        });

        structure.methods.forEach((methodStructure, i) => {
            runClassMethodDefinitionTests(definition.methods[i], methodStructure);
        });
    });

    describe("properties", () => {
        it("should have the expected number of properties", () => {
            assert.equal(definition.properties.length, structure.properties.length);
        });

        structure.properties.forEach((propertyStructure, i) => {
            runClassPropertyDefinitionTests(definition.properties[i], propertyStructure);
        });
    });

    describe("staticMethods", () => {
        it("should have the expected number of staticMethods", () => {
            assert.equal(definition.staticMethods.length, structure.staticMethods.length);
        });

        structure.staticMethods.forEach((methodStructure, i) => {
            runStaticMethodDefinitionTests(definition.staticMethods[i], methodStructure);
        });
    });

    describe("staticProperties", () => {
        it("should have the expected number of staticProperties", () => {
            assert.equal(definition.staticProperties.length, structure.staticProperties.length);
        });

        structure.staticProperties.forEach((propertyStructure, i) => {
            runStaticPropertyDefinitionTests(definition.staticProperties[i], propertyStructure);
        });
    });

    describe("extends", () => {
        it("should have the expected number of extends", () => {
            assert.equal(definition.extends.length, structure.extends.length);
        });

        structure.extends.forEach((extendStructure, i) => {
            runTypeExpressionTests(definition.extends[i], extendStructure);
        });
    });

    describe("implements", () => {
        it("should have the expected number of implements", () => {
            assert.equal(definition.implements.length, structure.implements.length);
        });

        structure.implements.forEach((implementStructure, i) => {
            runTypeExpressionTests(definition.implements[i], implementStructure);
        });
    });
}
