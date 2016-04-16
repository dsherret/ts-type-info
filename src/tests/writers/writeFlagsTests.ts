import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FileDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";

function getFileAsString(def: FileDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FileWriter(codeBlockWriter);

    writer.write(def, flags);

    return codeBlockWriter.toString();
}

// todo: this file should be moved into the other test files. For example, properties should be moved to propertyWriterTests.ts

describe("WriteFlags", () => {
    describe("classes", () => {
        const file = getInfoFromString(`
class MyClass {
    private myPrivateProp: string;
    protected myProtectedProp: string;
    public myPublicProp: string;
    private static myPrivateStaticProp: string;
    protected static myProtectedStaticProp: string;
    public static myPublicStaticProp: string;

    private myPrivateMethod() {}
    protected myProtectedMethod() {}
    public myPublicMethod() {}
    private static myPrivateStaticMethod() {}
    protected static myProtectedStaticMethod() {}
    public static myPublicStaticMethod() {}
}
`);

        type ResultType = { hasPrivate: boolean; hasProtected: boolean; hasPublic: boolean; };

        function getPublicPrivateProtected(flags: WriteFlags): ResultType {
            const writtenCode = getFileAsString(file, flags);

            return {
                hasPrivate: /private/.exec(writtenCode) != null,
                hasProtected: /protected/.exec(writtenCode) != null,
                hasPublic: /Public/.exec(writtenCode) != null
            };
        }

        function doPublicPrivateProtectedAssertions(result: ResultType, expected: ResultType) {
            it(`${expected.hasPrivate ? "should" : "should not"} include the private members`, () => {
                assert.equal(result.hasPrivate, expected.hasPrivate);
            });

            it(`${expected.hasProtected ? "should" : "should not"} include the protected members`, () => {
                assert.equal(result.hasProtected, expected.hasProtected);
            });

            it(`${expected.hasPublic ? "should" : "should not"} include the public members`, () => {
                assert.equal(result.hasPublic, expected.hasPublic);
            });
        }

        describe("WriteFlags.HidePrivateMemembers", () => {
            const result = getPublicPrivateProtected(WriteFlags.HidePrivateMembers);

            doPublicPrivateProtectedAssertions(result, { hasPrivate: false, hasProtected: true, hasPublic: true });
        });

        describe("WriteFlags.HideProtectedMembers", () => {
            const result = getPublicPrivateProtected(WriteFlags.HideProtectedMembers);

            doPublicPrivateProtectedAssertions(result, { hasPrivate: true, hasProtected: false, hasPublic: true });
        });

        describe("WriteFlags.HideProtectedMembers | WriteFlags.HidePrivateMembers", () => {
            const result = getPublicPrivateProtected(WriteFlags.HideProtectedMembers | WriteFlags.HidePrivateMembers);

            doPublicPrivateProtectedAssertions(result, { hasPrivate: false, hasProtected: false, hasPublic: true });
        });
    });

    describe("properties", () => {
        const file = getInfoFromString(`
class MyClass {
    myPublicProp: string = "text";
    myPublicProp2?: string = "text";
}
`);

        describe("WriteFlags.HideExpressions", () => {
            it("it should write properly when hiding", () => {
                const expected =
`class MyClass {
    myPublicProp: string;
    myPublicProp2?: string;
}
`;
                assert.equal(getFileAsString(file, WriteFlags.HideExpressions), expected);
            });

            it("it should write properly when not hiding", () => {
                const expected =
`class MyClass {
    myPublicProp = "text";
    myPublicProp2?: string = "text";
}
`;
                assert.equal(getFileAsString(file, WriteFlags.None), expected);
            });
        });
    });

    describe("variables", () => {
        const file = getInfoFromString(`var myVar = "my string"`);

        describe("WriteFlags.HideExpressions", () => {
            it("should not write the expression when specifying to", () => {
                const expected = `var myVar: string = "my string";\n`;
                assert.equal(getFileAsString(file, WriteFlags.None), expected);
            });

            it("should not write out the expression when not specifying to", () => {
                const expected = `var myVar: string;\n`;
                assert.equal(getFileAsString(file, WriteFlags.HideExpressions), expected);
            });
        });
    });

    describe("parameters", () => {
        const file = getInfoFromString(`function myFunction(param1 = "text") {}`);

        it("should contain the default expression", () => {
            const expected = `function myFunction(param1 = "text") {\n}\n`;
            assert.equal(getFileAsString(file, WriteFlags.None), expected);
        });

        it("should contain the property written out with the default expression", () => {
            const expected = `function myFunction(param1?: string) {\n}\n`;
            assert.equal(getFileAsString(file, WriteFlags.HideExpressions), expected);
        });
    });
});
