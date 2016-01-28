import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ClassDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {ClassWriter} from "./../../../writers";
import {WriteFlags} from "./../../../write-flags";

function getWriterString(c: ClassDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ClassWriter(codeBlockWriter);

    writer.write(c, flags);

    return codeBlockWriter.toString();
}

describe("ClassDefinition", () => {
    const code = `
class MyClass {
    private myString: string;

    myMethod() {
    }
}

class MyTypeParameterClass<T> {
}

class MyChildClass extends MyTypeParameterClass<string> {
}

class MyImplementsClass implements MyChildClass {
}

class MyExtendsImplementsClass extends MyChildClass implements MyImplementsClass {
}
`;
    const file = getStringInfo(code);

    describe("write()", () => {
        file.classes.forEach(c => {
            it(`should write the same thing as a class writer for the class ${c.name}`, () => {
                assert.equal(c.write(), getWriterString(c, WriteFlags.None));
            });
        });
    });
});
