import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FileDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../writeFlags";

function getFileAsString(def: FileDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FileWriter(codeBlockWriter, flags);

    writer.write(def);

    return codeBlockWriter.toString();
}

describe("WriteFlags", () => {
    describe("classes", () => {
        const file = getStringInfo(`
class MyClass {
    private myPrivateProp: string;
    protected myProtectedProp: string;
    public myPublicProp: string = "text";

    private myPrivateMethod() {}
    protected myProtectedMethod() {}
    public myPublicMethod() {}
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

        describe("WriteFlags.HideExpressions", () => {
            it("should contain the expression", () => {
                assert.equal(/text/.exec(getFileAsString(file, WriteFlags.Default)) != null, true);
            });

            it("should contain the property written without the default expression", () => {
                assert.equal(/text/.exec(getFileAsString(file, WriteFlags.HideExpressions)) != null, false);
            });
        });
    });

    describe("variables", () => {
        const file = getStringInfo(`var myVar = "my string"`);

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
        const file = getStringInfo(`function myFunction(param1 = "text") {}`);

        it("should contain the default expression", () => {
            const expected = `function myFunction(param1: string = "text") {\n}\n`;
            assert.equal(getFileAsString(file, WriteFlags.None), expected);
        });

        it("should contain the property written out with the default expression", () => {
            const expected = `function myFunction(param1?: string) {\n}\n`;
            assert.equal(getFileAsString(file, WriteFlags.HideExpressions), expected);
        });
    });
});
