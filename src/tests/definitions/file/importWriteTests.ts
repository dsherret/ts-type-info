import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

// most import writing tests are done in fileWriteTests. This test just sees that write() works on ImportDefinition
const code = `import "./test";`;

describe("ImportDefinition", () => {
    const file = getInfoFromString(code);

    describe("write()", () => {
        it("should contain the import written out", () => {
            const expected = `import "./test";`;
            assert.equal(file.imports[0].write(), expected);
        });
    });
});
