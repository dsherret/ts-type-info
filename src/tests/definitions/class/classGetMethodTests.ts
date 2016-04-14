import {ClassDefinition} from "./../../../definitions";
import {runNamedDefinitionTests} from "./../../testHelpers";

describe("ClassDefinition", () => {
    describe("getMethod", () => {
        const c = new ClassDefinition();
        c.addMethods({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(c.getMethod("name2"), { name: "name2" });
        runNamedDefinitionTests(c.getMethod(d => d.name === "name2"), { name: "name2" });
    });

    describe("getStaticMethod", () => {
        const c = new ClassDefinition();
        c.addStaticMethods({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(c.getStaticMethod("name2"), { name: "name2" });
        runNamedDefinitionTests(c.getStaticMethod(d => d.name === "name2"), { name: "name2" });
    });

    describe("getProperty", () => {
        const c = new ClassDefinition();
        c.addProperties({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(c.getProperty("name2"), { name: "name2" });
        runNamedDefinitionTests(c.getProperty(d => d.name === "name2"), { name: "name2" });
    });

    describe("getStaticProperty", () => {
        const c = new ClassDefinition();
        c.addStaticProperties({ name: "name1" }, { name: "name2" });
        runNamedDefinitionTests(c.getStaticProperty("name2"), { name: "name2" });
        runNamedDefinitionTests(c.getStaticProperty(d => d.name === "name2"), { name: "name2" });
    });
});
