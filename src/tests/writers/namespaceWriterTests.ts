import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {NamespaceDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {NamespaceWriter, ModuledWriter} from "./../../writers";
import {namespaceWriterTestCode} from "./testCode";

function getNamespaceAsString(f: NamespaceDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new NamespaceWriter(codeBlockWriter, new ModuledWriter(codeBlockWriter));

    writer.write(f);

    return codeBlockWriter.toString();
}

describe("NamespaceWriter", () => {
    const myFile = getInfoFromString(namespaceWriterTestCode);

    describe("write()", () => {
        describe("MyNamespace", () => {
            it("should contain everything written out", () => {
                const expected =
`namespace MyNamespace {
    interface MyInterface {
    }
}
`;
                assert.equal(getNamespaceAsString(myFile.namespaces[0]), expected);
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
                assert.equal(getNamespaceAsString(myFile.namespaces[1]), expected);
            });
        });
    });
});
