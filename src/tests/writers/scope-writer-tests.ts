import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ScopeWriter} from "./../../writers";
import {ScopedDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {WriteFlags} from "./../../write-flags";

function getScopeAsString(def: ScopedDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ScopeWriter(codeBlockWriter, WriteFlags.Default);

    writer.write(def.scope);

    return codeBlockWriter.toString();
}

describe("ScopeWriter", () => {
    const code = `
class MyClass {
    public myExplicitPublicString: string;
    myImplicitPublicString: string;
    protected protectedString: string;
    private privateString: string;
}
`;
    const myClass = getStringInfo(code).classes[0];

    describe("write()", () => {
        it("should be blank for public scopes that are implicit", () => {
            assert.equal(getScopeAsString(myClass.properties[0]), "");
        });

        it("should be blank for public scopes that are explicit", () => {
            assert.equal(getScopeAsString(myClass.properties[1]), "");
        });

        it("should be blank for objects that don't contain a scope property", () => {
            assert.equal(getScopeAsString({} as any), "");
        });

        it("should write protected for protected scopes", () => {
            assert.equal(getScopeAsString(myClass.properties[2]), "protected");
        });

        it("should write private for private scopes", () => {
            assert.equal(getScopeAsString(myClass.properties[3]), "private");
        });
    });
});
