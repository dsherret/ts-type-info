import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {ModuledWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";

function getModuledAsString(f: ModuledDefinitions, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ModuledWriter(codeBlockWriter, flags);

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
    const myFile = getStringInfo(code);

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

function myFunction(): void {
}
`;
            assert.equal(getModuledAsString(myFile, WriteFlags.Default), expected);
        });
    });
});
