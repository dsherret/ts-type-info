import * as assert from "assert";
import {ClassStructure} from "./../../structures";
import {ClassDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runDecoratableDefinitionTests, runTypeParameteredDefinitionTests} from "./../base";
import {runClassPropertyDefinitionTests} from "./run-class-property-definition-tests";
import {runClassMethodDefinitionTests} from "./run-class-method-definition-tests";
import {runClassStaticPropertyDefinitionTests} from "./run-class-static-property-definition-tests";
import {runClassStaticMethodDefinitionTests} from "./run-class-static-method-definition-tests";
import {runConstructorDefinitionTests} from "./run-constructor-definition-tests";
import {runTypeExpressionTests} from "./../../expressions";

export function runClassDefinitionTests(definition: ClassDefinition, structure: ClassStructure) {
    structure.methods = structure.methods || [];
    structure.properties = structure.properties || [];
    structure.staticMethods = structure.staticMethods || [];
    structure.staticProperties = structure.staticProperties || [];
    structure.extendsTypeExpressions = structure.extendsTypeExpressions || [];
    structure.implementsTypeExpressions = structure.implementsTypeExpressions || [];

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
            runClassStaticMethodDefinitionTests(definition.staticMethods[i], methodStructure);
        });
    });

    describe("staticProperties", () => {
        it("should have the expected number of staticProperties", () => {
            assert.equal(definition.staticProperties.length, structure.staticProperties.length);
        });

        structure.staticProperties.forEach((propertyStructure, i) => {
            runClassStaticPropertyDefinitionTests(definition.staticProperties[i], propertyStructure);
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

    describe("implements", () => {
        it("should have the expected number of implements", () => {
            assert.equal(definition.implementsTypeExpressions.length, structure.implementsTypeExpressions.length);
        });

        structure.implementsTypeExpressions.forEach((implementStructure, i) => {
            runTypeExpressionTests(definition.implementsTypeExpressions[i], implementStructure);
        });
    });
}
