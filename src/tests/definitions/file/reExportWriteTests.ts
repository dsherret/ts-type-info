import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

// most import writing tests are done in fileWriteTests. This test just sees that write() works on ImportDefinition
const code = `export * from "./test";`;

describe("ReExportDefinition", () => {
    const file = getInfoFromString(code);

    describe("write()", () => {
        it("should contain the import written out", () => {
            const expected = `export * from "./test";`;
            assert.equal(file.reExports[0].write(), expected);
        });
    });
});
