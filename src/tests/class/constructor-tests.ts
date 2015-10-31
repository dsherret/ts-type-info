import {getStringInfo} from "./../../main";
import * as assert from "assert";

describe("class constructor tests", () => {
    describe("class with no constructor", () => {
        const code = `
class MyClass {
}`;

        const def = getStringInfo(code);

        it("should not have a constructor", () => {
            assert.equal(def.classes[0].constructor, null);
        });
    });

    describe("constructor with no parameters", () => {
        const code = `
class MyClass {
    constructor() {
    }
}`;

        const def = getStringInfo(code);

        it("should have a constructor", () => {
            assert.notEqual(def.classes[0].constructor, null);
        });

        it("should have no parameters", () => {
            assert.equal(def.classes[0].constructor.parameters.length, 0);
        });
    });

    describe("constructor with parameters", () => {
        const code = `
class MyClass {
    constructor(parameter1: string, parameter2: number) {
    }
}`;

        const def = getStringInfo(code);

        it("should have two parameters", () => {
            assert.equal(def.classes[0].constructor.parameters.length, 2);
        });
    });
});