import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("object type tests", () => {
    const code = `
class MyClass {
    myMethod(obj: { myStringParam: string; myOtherType: Note; }) {
    }
}
class Note {
}`;

    const def = getStringInfo(code);

    describe("myStringParam", () => {
        const prop = def.classes[0].methods[0].parameters[0].type.properties[0];

        runNamedDefinitionTests(prop, "myStringParam");

        it("should have type string", () => {
            assert.equal(prop.type.name, "string");
        });
    });

    describe("myOtherType", () => {
        const prop = def.classes[0].methods[0].parameters[0].type.properties[1];

        runNamedDefinitionTests(prop, "myOtherType");

        it("should have type Note", () => {
            assert.equal(prop.type.name, "Note");
        });
    });
});
