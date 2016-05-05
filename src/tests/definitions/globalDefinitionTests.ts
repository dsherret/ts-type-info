import * as assert from "assert";
import {GlobalDefinition} from "./../../definitions";

describe("GlobalDefinition", () => {
    describe("addFiles", () => {
        const def = new GlobalDefinition();
        def.addFiles({ fileName: "test.ts" }, { fileName: "test2.ts" });

        // good enough to just check the number of files is correct...
        // this is tested more thoroughly in the createFile tests
        it("should have the right number of files", () => {
            assert.equal(def.files.length, 2);
        });
    });

    describe("getFile", () => {
        const def = new GlobalDefinition();
        def.addFiles({ fileName: "test.ts" }, { fileName: "test2.ts" });

        it("should get the correct file when specifying a file name", () => {
            assert.equal(def.getFile("test2.ts"), def.files[1]);
        });

        it("should get the correct file when specifying a function", () => {
            assert.equal(def.getFile(f => f.fileName === "test2.ts"), def.files[1]);
        });
    });
});
