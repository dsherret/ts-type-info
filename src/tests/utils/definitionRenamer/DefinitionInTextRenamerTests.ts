import * as assert from "assert";
import {DefinitionInTextRenamer} from "./../../../utils/definitionRenamer/DefinitionInTextRenamer";

describe("DefinitionInTextRenamer", () => {
    it("should rename the name outside type parameters", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText("MyClass<any, MyOtherClass>", "MyClass", "MyNewName");
        assert.equal(result, "MyNewName<any, MyOtherClass>");
    });

    it("should rename the name inside type parameters", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText("MyClass<any, MyOtherClass>", "MyOtherClass", "MyNewName");
        assert.equal(result, "MyClass<any, MyNewName>");
    });

    it("should rename at beginning of string", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText("MyClass1 | MyClass2", "MyClass1", "MyNewName");
        assert.equal(result, "MyNewName | MyClass2");
    });

    it("should rename at end of string", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText("MyClass1 | MyClass2", "MyClass2", "MyNewName");
        assert.equal(result, "MyClass1 | MyNewName");
    });

    it("should rename in intersection and union type", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText("(MyClass1 & MyClass2) | MyClass3", "MyClass2", "MyNewName");
        assert.equal(result, "(MyClass1 & MyNewName) | MyClass3");
    });

    it("should rename a namespace when it matches exactly", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText("MyNamespace.MyClass", "MyNamespace.MyClass", "MyNamespace.MyNewName");
        assert.equal(result, "MyNamespace.MyNewName");
    });

    it("should rename a namespace when it matches from the left", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText("MyNamespace.MyOtherNamespace.MyClass", "MyNamespace.MyOtherNamespace", "MyNamespace.MyNewNamespace");
        assert.equal(result, "MyNamespace.MyNewNamespace.MyClass");
    });

    it("should NOT rename a namespace when it matches from the right", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText("MyNamespace.MyOtherNamespace.MyClass", "MyOtherNamespace.MyClass", "MyOtherNamespace.MyNewClass");
        assert.equal(result, "MyNamespace.MyOtherNamespace.MyClass");
    });

    it("should NOT rename in double quotes", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText(`"MyNamespace"`, "MyNamespace", "MyNewNamespace");
        assert.equal(result, `"MyNamespace"`);
    });

    it("should NOT rename in single quotes", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText(`'MyNamespace'`, "MyNamespace", "MyNewNamespace");
        assert.equal(result, `'MyNamespace'`);
    });

    it("should NOT rename in back tick quotes", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText("`MyNamespace`", "MyNamespace", "MyNewNamespace");
        assert.equal(result, "`MyNamespace`");
    });

    it("should rename in back tick quotes' ${}", () => {
        const result = DefinitionInTextRenamer.renameDefinitionInText("`MyNamespace${MyNamespace}MyNamespace`", "MyNamespace", "MyNewNamespace");
        assert.equal(result, "`MyNamespace${MyNewNamespace}MyNamespace`");
    });
});
