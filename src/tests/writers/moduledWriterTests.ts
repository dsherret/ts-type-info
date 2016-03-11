import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {ModuledWriter} from "./../../writers";

function getModuledAsString(f: ModuledDefinitions) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ModuledWriter(codeBlockWriter);

    writer.write(f);

    return codeBlockWriter.toString();
}

describe("ModuledWriter", () => {
    const code = `
type myType = string;
type mySecondType = string | number;
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
    const myFile = getInfoFromString(code);

    describe("write()", () => {
        it("should contain everything written out", () => {
            const expected =
`type myType = string;
type mySecondType = string | number;

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
            assert.equal(getModuledAsString(myFile), expected);
        });
    });
});
