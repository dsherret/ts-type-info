﻿import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FileDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {FileWriter} from "./../../writers";
import {fileWriterTestCode} from "./testCode";

function getFileAsString(f: FileDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FileWriter(codeBlockWriter);

    writer.write(f);

    return codeBlockWriter.toString();
}

describe("FileWriter", () => {
    const myFile = getInfoFromString(fileWriterTestCode);

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
            assert.equal(getFileAsString(myFile), expected);
        });
    });
});