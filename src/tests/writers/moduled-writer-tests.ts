import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {IModuledDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {ModuledWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";

function getModuledAsString(f: IModuledDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ModuledWriter(codeBlockWriter);

    writer.write(f, flags);

    return codeBlockWriter.toString();
}

describe("ModuledWriter", () => {
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
        it("should contain everything written out", () => {
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
            assert.equal(getModuledAsString(myFile, WriteFlags.None), expected);
        });
    });
});
