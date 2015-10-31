import {getStringInfo} from "./../../main";
import * as assert from "assert";

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
        it("should exist", () => {
            assert.equal(def.classes[0].methods[0].parameters[0].type.properties[0].name, "myStringParam");
        });

        it("should have type string", () => {
            assert.equal(def.classes[0].methods[0].parameters[0].type.properties[0].type.name, "string");
        });
    });

    describe("myOtherType", () => {
        it("should exist", () => {
            assert.equal(def.classes[0].methods[0].parameters[0].type.properties[1].name, "myOtherType");
        });

        it("should have type Note", () => {
            assert.equal(def.classes[0].methods[0].parameters[0].type.properties[1].type.name, "Note");
        });
    });
});