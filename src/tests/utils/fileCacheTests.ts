import {expect} from "chai";
import {FileCache} from "./../../utils";

class FileCacheExtended extends FileCache {
    constructor() {
        super();
    }

    numberFileReads = 0;

    protected readFileSync(filePath: string) {
        this.numberFileReads++;
        return filePath + "_text";
    }
}

describe(nameof(FileCache), () => {
    describe(nameof<FileCache>(c => c.getFileText), () => {
        describe("getting file text", () => {
            const cache = new FileCacheExtended();
            const text = cache.getFileText("path");

            it("should get the expected text", () => {
                expect(text).to.equal("path_text");
            });
        });

        describe("getting file text twice", () => {
            const cache = new FileCacheExtended();
            const text1 = cache.getFileText("path");
            const text2 = cache.getFileText("path");

            it("the texts should equal", () => {
                expect(text1).to.equal(text2);
            });

            it("should have only read once", () => {
                expect(cache.numberFileReads).to.equal(1);
            });
        });

        describe("getting different file texts", () => {
            const cache = new FileCacheExtended();
            const text1 = cache.getFileText("path1");
            const text2 = cache.getFileText("path2");

            it("text1 should equal the expected text", () => {
                expect(text1).to.equal("path1_text");
            });

            it("text2 should equal the expected text", () => {
                expect(text2).to.equal("path2_text");
            });

            it("should have read twice", () => {
                expect(cache.numberFileReads).to.equal(2);
            });
        });
    });
});
