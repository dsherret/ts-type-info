import * as assert from "assert";
import {ClassTestStructure} from "./../../testStructures";
import {ClassDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runDecoratableDefinitionTests, runTypeParameteredDefinitionTests, runAmbientableDefinitionTests,
        runAbstractableDefinitionTests, runParentedDefinitionTests} from "./../base";
import {runClassPropertyDefinitionTests} from "./runClassPropertyDefinitionTests";
import {runClassMethodDefinitionTests} from "./runClassMethodDefinitionTests";
import {runClassStaticPropertyDefinitionTests} from "./runClassStaticPropertyDefinitionTests";
import {runClassStaticMethodDefinitionTests} from "./runClassStaticMethodDefinitionTests";
import {runClassConstructorDefinitionTests} from "./runClassConstructorDefinitionTests";
import {runTypeExpressionTests} from "./../../expressions";
import {ensureNotNull} from "./../../ensureNotNull";

export function runClassDefinitionTests(definition: ClassDefinition, structure: ClassTestStructure) {
    describe(`class ${structure.name}`, () => {
        ensureNotNull(definition, () => {
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
            runAbstractableDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runParentedDefinitionTests(definition);
            runClassConstructorDefinitionTests(definition.constructorDef, structure.constructorDef);

            it(`should ${structure.isAbstract ? "be" : "not be"} abstract.`, () => {
                assert.equal(definition.isAbstract, structure.isAbstract || false);
            });

            describe("methods", () => {
                it("should have the expected number of methods", () => {
                    assert.equal(definition.methods.length, structure.methods.length);
                });

                structure.methods.forEach((methodTestStructure, i) => {
                    runClassMethodDefinitionTests(definition.methods[i], methodTestStructure);
                });
            });

            describe("properties", () => {
                it("should have the expected number of properties", () => {
                    assert.equal(definition.properties.length, structure.properties.length);
                });

                structure.properties.forEach((propertyTestStructure, i) => {
                    runClassPropertyDefinitionTests(definition.properties[i], propertyTestStructure);
                });
            });

            describe("staticMethods", () => {
                it("should have the expected number of staticMethods", () => {
                    assert.equal(definition.staticMethods.length, structure.staticMethods.length);
                });

                structure.staticMethods.forEach((methodTestStructure, i) => {
                    runClassStaticMethodDefinitionTests(definition.staticMethods[i], methodTestStructure);
                });
            });

            describe("staticProperties", () => {
                it("should have the expected number of staticProperties", () => {
                    assert.equal(definition.staticProperties.length, structure.staticProperties.length);
                });

                structure.staticProperties.forEach((propertyTestStructure, i) => {
                    runClassStaticPropertyDefinitionTests(definition.staticProperties[i], propertyTestStructure);
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

            describe("implements", () => {
                it("should have the expected number of implements", () => {
                    assert.equal(definition.implementsTypeExpressions.length, structure.implementsTypeExpressions.length);
                });

                structure.implementsTypeExpressions.forEach((implementTestStructure, i) => {
                    runTypeExpressionTests(definition.implementsTypeExpressions[i], implementTestStructure);
                });
            });
        });
    });
}
