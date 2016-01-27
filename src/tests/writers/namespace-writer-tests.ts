import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {NamespaceDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {NamespaceWriter, ModuledWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";

function getNamespaceAsString(f: NamespaceDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new NamespaceWriter(codeBlockWriter, new ModuledWriter(codeBlockWriter));

    writer.write(f, flags);

    return codeBlockWriter.toString();
}

describe("ModuledWriter", () => {
    const code = `
namespace MyNamespace {
    interface MyInterface {
    }
}
module MyModule {
    interface MyInterface {
    }
}
`;
    const myFile = getStringInfo(code);

    describe("write()", () => {
        describe("MyNamespace", () => {
            it("should contain everything written out", () => {
                const expected =
`namespace MyNamespace {
    interface MyInterface {
    }
}
`;
                assert.equal(getNamespaceAsString(myFile.namespaces[0], WriteFlags.None), expected);
            });
        });

        describe("MyModule", () => {
            it("should contain everything written out", () => {
                const expected =
`module MyModule {
    interface MyInterface {
    }
}
`;
                assert.equal(getNamespaceAsString(myFile.namespaces[1], WriteFlags.None), expected);
            });
        });
    });
});
