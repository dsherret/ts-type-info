import * as assert from "assert";
import {InterfaceDefinition} from "./../../../definitions";
// import {runInterfacePropertyDefinitionTests} from "./../../testHelpers";

describe("InterfaceDefinition", () => {
    describe("addExtends", () => {
        const c = new InterfaceDefinition();
        c.addExtends("test", "test2");

        it("should have two extends expressions", () => {
            assert.equal(c.extendsTypeExpressions.length, 2);
        });

        it("should have a test expression", () => {
            assert.equal(c.extendsTypeExpressions[0].text, "test");
        });
    });

    /* todo:
    describe("addProperty", () => {
        const i = new InterfaceDefinition();

        i.addProperty({
            isOptional: true,
            name: "myProperty",
            type: "string"
        });

        runInterfacePropertyDefinitionTests(i.properties[0], {
            isOptional: true,
            name: "myProperty",
            typeExpression: { text: "string" }
        });
    });
    */
});
