import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {NamespaceDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {NamespaceWriter, ModuledWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {namespaceWriterTestCode} from "./test-code";

function getNamespaceAsString(f: NamespaceDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new NamespaceWriter(codeBlockWriter, flags, new ModuledWriter(codeBlockWriter, flags));

    writer.write(f);

    return codeBlockWriter.toString();
}

describe("NamespaceWriter", () => {
    const myFile = getStringInfo(namespaceWriterTestCode);

    describe("write()", () => {
        describe("MyNamespace", () => {
            it("should contain everything written out", () => {
                const expected =
`namespace MyNamespace {
    interface MyInterface {
    }
}
`;
                assert.equal(getNamespaceAsString(myFile.namespaces[0], WriteFlags.Default), expected);
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
                assert.equal(getNamespaceAsString(myFile.namespaces[1], WriteFlags.Default), expected);
            });
        });
    });
});
