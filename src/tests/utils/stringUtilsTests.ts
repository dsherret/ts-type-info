import {StringUtils} from "./../../utils";
import * as assert from "assert";

describe("StringUtils", () => {
    describe("#ensureEndsWithNewline()", () => {
        it("should return null for a null string", () => {
            assert.equal(StringUtils.ensureEndsWithNewline(null), null);
        });

        it("should add a newline for an empty string", () => {
            assert.equal(StringUtils.ensureEndsWithNewline(""), "\n");
        });

        it("should add a newline for a non-empty string", () => {
            assert.equal(StringUtils.ensureEndsWithNewline("text"), "text\n");
        });

        it("should not add a newline for a string that ends in a newline", () => {
            assert.equal(StringUtils.ensureEndsWithNewline("text\n"), "text\n");
        });
    });
});
