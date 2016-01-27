import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FileDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";

function getFileAsString(f: FileDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FileWriter(codeBlockWriter);

    writer.write(f, flags);

    return codeBlockWriter.toString();
}

describe("FileWriter", () => {
    const code = `
namespace MyNamespace {
}
module MyModule {
}
interface MyInterface {
}
class MyClass {
}
enum MyEnum {
}
function myFunction() {
}
`;
    const myFile = getStringInfo(code);

    describe("write()", () => {
        it("should contain the file written out", () => {
            const expected =
`namespace MyNamespace {
}

module MyModule {
}

interface MyInterface {
}

class MyClass {
}

enum MyEnum {
}

function myFunction(): void {
}
`;
            assert.equal(getFileAsString(myFile, WriteFlags.None), expected);
        });
    });
});
