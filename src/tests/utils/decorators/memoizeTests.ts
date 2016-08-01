import * as assert from "assert";
import {Memoize} from "./../../../utils/decorators/Memoize";

describe("Memoize", () => {
    class MyClass {
        @Memoize
        getNumber() {
            return Math.random();
        }

        @Memoize
        get value() {
            return Math.random();
        }
    }

    const a = new MyClass();
    const b = new MyClass();

    it("method should be memoized", () => {
        assert.equal(a.getNumber(), a.getNumber());
    });

    it("accessor should be memoized", () => {
        assert.equal(a.value, a.value);
    });

    it("multiple instances shouldn't share values for methods", () => {
        assert.notEqual(a.getNumber(), b.getNumber());
    });

    it("multiple instances shouldn't share values for accessors", () => {
        assert.notEqual(a.value, b.value);
    });
});
