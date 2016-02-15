import * as assert from "assert";
import {ExtendedArray} from "./../../utils";

describe("ExtendedArray", () => {
    describe("#removeWhere", () => {
        it("should remove the specified items", () => {
            const a = new ExtendedArray<number>(1, 2, 3, 4, 5, 6, 7, 8);
            a.removeWhere(item => item <= 5 || item >= 8); // bounds checking
            assert.equal(a.length, 2);
            assert.equal(a[0], 6);
            assert.equal(a[1], 7);
        });
    });

    describe("#firstOrDefault", () => {
        const a = new ExtendedArray<number>(1, 2, 3, 4, 5, 6, 7, 8);

        it("should return the first item that matches the condition", () => {
            assert.equal(a.firstOrDefault(item => item > 4), 5);
        });

        it("should return null if nothing matches", () => {
            assert.equal(a.firstOrDefault(item => item > 10), null);
        });
    });
});
