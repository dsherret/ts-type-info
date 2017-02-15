﻿import {expect} from "chai";
import {ArrayUtils} from "./../../utils";

describe(nameof(ArrayUtils), () => {
    describe(`#${nameof(ArrayUtils.isNullOrEmpty)}()`, () => {
        it("should return true when null", () => {
            expect(ArrayUtils.isNullOrEmpty(null as any)).to.equal(true);
        });

        it("should return true when undefined", () => {
            expect(ArrayUtils.isNullOrEmpty(undefined as any)).to.equal(true);
        });

        it("should return true when empty", () => {
            expect(ArrayUtils.isNullOrEmpty([])).to.equal(true);
        });

        it("should return false when not empty", () => {
            expect(ArrayUtils.isNullOrEmpty([1])).to.equal(false);
        });
    });

    describe(`#${nameof(ArrayUtils.firstOrDefault)}()`, () => {
        it("should return null when the array is empty", () => {
            expect(ArrayUtils.firstOrDefault([] as number[], item => item === 0)).to.equal(null);
        });

        it("should return null when the item can't be found", () => {
            expect(ArrayUtils.firstOrDefault([1, 2, 3], item => item === 0)).to.equal(null);
        });

        it("should return the item when it can be found", () => {
            expect(ArrayUtils.firstOrDefault([1, 2, 3], item => item === 3)).to.equal(3);
        });
    });

    describe(`#${nameof(ArrayUtils.getUniqueItems)}()`, () => {
        it("should return all the unique items in the array", () => {
            expect(ArrayUtils.getUniqueItems([1, 2, 3, 3, 2, 1])).to.eql([1, 2, 3]);
        });
    });
});
