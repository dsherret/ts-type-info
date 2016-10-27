import * as assert from "assert";
import {ClassTestStructure} from "./../../testStructures";
import {ClassDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests, runNamedDefinitionTests, runExportableDefinitionTests, runDecoratableDefinitionTests, runTypeParameteredDefinitionTests,
    runAmbientableDefinitionTests, runAbstractableDefinitionTests, runOrderableDefinitionTests, runDocumentationedDefinitionTests} from "./../base";
import {runClassPropertyDefinitionTests} from "./runClassPropertyDefinitionTests";
import {runClassMethodDefinitionTests} from "./runClassMethodDefinitionTests";
import {runClassStaticPropertyDefinitionTests} from "./runClassStaticPropertyDefinitionTests";
import {runClassStaticMethodDefinitionTests} from "./runClassStaticMethodDefinitionTests";
import {runClassConstructorDefinitionTests} from "./runClassConstructorDefinitionTests";
import {runTypeDefinitionTests} from "./../expression";
import {ensureNotNull} from "./../../ensureNotNull";

export function runClassDefinitionTests(definition: ClassDefinition, structure: ClassTestStructure) {
    describe(`class ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.methods = structure.methods || [];
            structure.properties = structure.properties || [];
            structure.staticMethods = structure.staticMethods || [];
            structure.staticProperties = structure.staticProperties || [];
            structure.extendsTypes = structure.extendsTypes || [];
            structure.implementsTypes = structure.implementsTypes || [];

            runBaseDefinitionTests(definition, structure);
            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runDecoratableDefinitionTests(definition, structure);
            runTypeParameteredDefinitionTests(definition, structure);
            runAbstractableDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runClassConstructorDefinitionTests(definition.constructorDef, structure.constructorDef);
            runOrderableDefinitionTests(definition, structure);
            runDocumentationedDefinitionTests(definition, structure);

            it(`should ${structure.isAbstract ? "be" : "not be"} abstract.`, () => {
                assert.equal(definition.isAbstract, structure.isAbstract || false);
            });

            describe("methods", () => {
                it("should have the expected number of methods", () => {
                    assert.equal(definition.methods.length, structure.methods!.length);
                });

                structure.methods!.forEach((methodTestStructure, i) => {
                    runClassMethodDefinitionTests(definition.methods[i], methodTestStructure);
                });
            });

            describe("properties", () => {
                it("should have the expected number of properties", () => {
                    assert.equal(definition.properties.length, structure.properties!.length);
                });

                structure.properties!.forEach((propertyTestStructure, i) => {
                    runClassPropertyDefinitionTests(definition.properties[i], propertyTestStructure);
                });
            });

            describe("staticMethods", () => {
                it("should have the expected number of staticMethods", () => {
                    assert.equal(definition.staticMethods.length, structure.staticMethods!.length);
                });

                structure.staticMethods!.forEach((methodTestStructure, i) => {
                    runClassStaticMethodDefinitionTests(definition.staticMethods[i], methodTestStructure);
                });
            });

            describe("staticProperties", () => {
                it("should have the expected number of staticProperties", () => {
                    assert.equal(definition.staticProperties.length, structure.staticProperties!.length);
                });

                structure.staticProperties!.forEach((propertyTestStructure, i) => {
                    runClassStaticPropertyDefinitionTests(definition.staticProperties[i], propertyTestStructure);
                });
            });

            describe("extends", () => {
                it("should have the expected number of extends", () => {
                    assert.equal(definition.extendsTypes.length, structure.extendsTypes!.length);
                });

                structure.extendsTypes!.forEach((extendTestStructure, i) => {
                    runTypeDefinitionTests(definition.extendsTypes[i], extendTestStructure);
                });
            });

            describe("implements", () => {
                it("should have the expected number of implements", () => {
                    assert.equal(definition.implementsTypes.length, structure.implementsTypes!.length);
                });

                structure.implementsTypes!.forEach((implementTestStructure, i) => {
                    runTypeDefinitionTests(definition.implementsTypes[i], implementTestStructure);
                });
            });
        });
    });
}
