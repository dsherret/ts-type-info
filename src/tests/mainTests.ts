import * as tsTypeInfo from "./../main";
import * as assert from "assert";
import * as path from "path";

describe("Main", () => {
    describe("#getInfoFromFiles()", () => {
        it("should throw an error when not providing an array", () => {
            assert.throws(() => tsTypeInfo.getInfoFromFiles("" as any), Error);
        });

        it("should not handle a non ts file when specifying not to allow them", () => {
            const result = tsTypeInfo.getInfoFromFiles([path.join(__dirname, "../../src/tests/testFiles/nonTsFile.txt")], {
                compilerOptions: { allowNonTsExtensions: false }
            });
            assert.equal(result.length, 0);
        });

        it("should get the class definition when specifying the compiler option to allow non ts extensions", () => {
            const result = tsTypeInfo.getInfoFromFiles([path.join(__dirname, "../../src/tests/testFiles/nonTsFile.txt")], {
                compilerOptions: { allowNonTsExtensions: true }
            });
            assert.equal(result[0].classes[0].name, "MyClass");
        });
    });

    describe("#getInfoFromString()", () => {
        it("should throw an error when not providing a string", () => {
            assert.throws(() => tsTypeInfo.getInfoFromString([] as any), Error);
        });

        it("should allow changing the compiler options", () => {
            const result = tsTypeInfo.getInfoFromString("class MyClass {}\n\n", { });
            assert.equal(result.classes[0].name, "MyClass");
        });
    });
});
