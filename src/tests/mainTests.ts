import * as assert from "assert";
import * as path from "path";
import * as tsTypeInfo from "./../main";

describe("Main", () => {
    describe("#getInfoFromFiles()", () => {
        it("should throw an error when not providing an array", () => {
            assert.throws(() => tsTypeInfo.getInfoFromFiles("" as any));
        });

        it("should not handle a js file when specifying to not allow them", () => {
            const result = tsTypeInfo.getInfoFromFiles([path.join(__dirname, "../../src/tests/testFiles/nonTsFile.js")], {
                compilerOptions: { allowJs: false }
            });
            assert.equal(result.files.length, 0);
        });

        it("should get the class definition when specifying the compiler option to allow js", () => {
            const result = tsTypeInfo.getInfoFromFiles([path.join(__dirname, "../../src/tests/testFiles/nonTsFile.js")], {
                compilerOptions: { allowJs: true }
            });
            assert.equal(result.files[0].classes[0].name, "MyClass");
        });

        it("should throw an error when a file isn't found", () => {
            assert.throws(() => {
                tsTypeInfo.getInfoFromFiles(["nonExistentFile.txt"]);
            });
        });
    });

    describe("#getInfoFromString()", () => {
        it("should throw an error when not providing a string", () => {
            assert.throws(() => tsTypeInfo.getInfoFromString([] as any));
        });

        it("should throw an error when providing a compiler host", () => {
            assert.throws(() => tsTypeInfo.getInfoFromString("", { compilerHost: {} as any }));
        });

        it("should allow changing the compiler options", () => {
            const result = tsTypeInfo.getInfoFromString("class MyClass {}\n\n", { });
            assert.equal(result.classes[0].name, "MyClass");
        });
    });
});
