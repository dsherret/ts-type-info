import * as assert from "assert";
import {getInfoFromString} from "./../../../main";

const code = `
var myVariable: string;
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

describe("FileDefinition", () => {
    const file = getInfoFromString(code);

    describe("write()", () => {
        it("should contain the file written out", () => {
            const expected =
`var myVariable: string;

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
            assert.equal(file.write(), expected);
        });
    });
});
