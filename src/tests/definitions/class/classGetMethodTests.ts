import * as assert from "assert";
import {ClassDefinition, ClassConstructorParameterScope} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../../testHelpers";

describe("ClassDefinition", () => {
    describe("#getMethod()", () => {
        const c = new ClassDefinition();
        c.addMethod({ name: "name1" });
        c.addMethod({ name: "name2" });
        runNamedDefinitionTests(c.getMethod("name2"), { name: "name2" });
        runNamedDefinitionTests(c.getMethod(d => d.name === "name2"), { name: "name2" });
    });

    describe("#getStaticMethod()", () => {
        const c = new ClassDefinition();
        c.addStaticMethod({ name: "name1" });
        c.addStaticMethod({ name: "name2" });
        runNamedDefinitionTests(c.getStaticMethod("name2"), { name: "name2" });
        runNamedDefinitionTests(c.getStaticMethod(d => d.name === "name2"), { name: "name2" });
    });

    describe("#getProperty()", () => {
        const c = new ClassDefinition();
        c.addProperty({ name: "name1" });
        c.addProperty({ name: "name2" });
        runNamedDefinitionTests(c.getProperty("name2"), { name: "name2" });
        runNamedDefinitionTests(c.getProperty(d => d.name === "name2"), { name: "name2" });
    });

    describe("#getStaticProperty()", () => {
        const c = new ClassDefinition();
        c.addStaticProperty({ name: "name1" });
        c.addStaticProperty({ name: "name2" });
        runNamedDefinitionTests(c.getStaticProperty("name2"), { name: "name2" });
        runNamedDefinitionTests(c.getStaticProperty(d => d.name === "name2"), { name: "name2" });
    });

    describe("#getPropertiesAndConstructorParameters()", () => {
        describe("with constructor", () => {
            const c = new ClassDefinition();
            c.addProperty({ name: "name1" });
            c.addProperty({ name: "name2" });
            c.setConstructor({
                parameters: [{
                    name: "myFirst"
                }, {
                    name: "mySecond",
                    scope: ClassConstructorParameterScope.Private
                }]
            });

            const allProps = c.getPropertiesAndConstructorParameters();

            it("should be a length of 3", () => {
                assert.equal(allProps.length, 3);
            });

            it("should have the constructor parameter first", () => {
                assert.equal(allProps[0], c.constructorDef.parameters[1]);
            });

            it("should have the first property second", () => {
                assert.equal(allProps[1], c.properties[0]);
            });

            it("should have the second property last", () => {
                assert.equal(allProps[2], c.properties[1]);
            });
        });

        describe("without constructor", () => {
            const c = new ClassDefinition();
            c.addProperty({ name: "name1" });
            c.addProperty({ name: "name2" });
            const allProps = c.getPropertiesAndConstructorParameters();

            it("should be a length of 2", () => {
                assert.equal(allProps.length, 2);
            });
        });
    });
});
