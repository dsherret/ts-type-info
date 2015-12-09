import * as tsTypeInfo from "./../main";
import * as assert from "assert";

describe("Main", () => {
    describe("#getFileInfo()", () => {
        it("should throw an error when not providing an array", () => {
            assert.throws(() => tsTypeInfo.getFileInfo("" as any), Error);
        });
    });

    describe("#getStringInfo()", () => {
        it("should throw an error when not providing a string", () => {
            assert.throws(() => tsTypeInfo.getStringInfo([] as any), Error);
        });
    });
});
