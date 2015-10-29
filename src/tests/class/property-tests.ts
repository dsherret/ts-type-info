import {getStringInfo} from "./../../main";
import * as assert from "assert";

describe("class property tests", () => {
    const code = `
class MyClass {
    myString: string;
    myImplicit = 4;
    myAny;

    private myPrivate;
}`;

    const def = getStringInfo(code);

    describe("property myString", () => {
        const prop = def.classes[0].properties[0];

        it("should have name myString", () => {
            assert.equal(prop.name, "myString");
        });

        it("should have type string", () => {
            assert.equal(prop.type.name, "string");
        });
    });

    describe("property myImplicit", () => {
        const prop = def.classes[0].properties[1];

        it("should have name myImplicit", () => {
            assert.equal(prop.name, "myImplicit");
        });

        it("should have type number", () => {
            assert.equal(prop.type.name, "number");
        });
    });

    describe("property myAny", () => {
        const prop = def.classes[0].properties[2];

        it("should have name myAny", () => {
            assert.equal(prop.name, "myAny");
        });

        it("should have type any", () => {
            assert.equal(prop.type.name, "any");
        });
    });

    describe("property myPrivate", () => {
        const prop = def.classes[0].properties[3];

        it("should have name myPrivate", () => {
            assert.equal(prop.name, "myPrivate");
        });

        it("should be private", () => {
            assert.equal(prop.type.name, "any");
        });
    });
});
