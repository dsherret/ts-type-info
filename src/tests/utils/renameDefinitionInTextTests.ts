import * as assert from "assert";
import {renameDefinitionInText} from "./../../utils/definitionRenamer/renameDefinitionInText";

describe("renameDefinitionInText", () => {
    it("should rename the name outside type parameters", () => {
        const result = renameDefinitionInText("MyClass<any, MyOtherClass>", "MyClass", "MyNewName");
        assert.equal(result, "MyNewName<any, MyOtherClass>");
    });

    it("should rename the name inside type parameters", () => {
        const result = renameDefinitionInText("MyClass<any, MyOtherClass>", "MyOtherClass", "MyNewName");
        assert.equal(result, "MyClass<any, MyNewName>");
    });

    it("should rename at beginning of string", () => {
        const result = renameDefinitionInText("MyClass1 | MyClass2", "MyClass1", "MyNewName");
        assert.equal(result, "MyNewName | MyClass2");
    });

    it("should rename at end of string", () => {
        const result = renameDefinitionInText("MyClass1 | MyClass2", "MyClass2", "MyNewName");
        assert.equal(result, "MyClass1 | MyNewName");
    });

    it("should rename in intersection and union type", () => {
        const result = renameDefinitionInText("(MyClass1 & MyClass2) | MyClass3", "MyClass2", "MyNewName");
        assert.equal(result, "(MyClass1 & MyNewName) | MyClass3");
    });

    it("should rename a namespace when it matches exactly", () => {
        const result = renameDefinitionInText("MyNamespace.MyClass", "MyNamespace.MyClass", "MyNamespace.MyNewName");
        assert.equal(result, "MyNamespace.MyNewName");
    });

    it("should rename a namespace when it matches from the left", () => {
        const result = renameDefinitionInText("MyNamespace.MyOtherNamespace.MyClass", "MyNamespace.MyOtherNamespace", "MyNamespace.MyNewNamespace");
        assert.equal(result, "MyNamespace.MyNewNamespace.MyClass");
    });

    it("should NOT rename a namespace when it matches from the right", () => {
        const result = renameDefinitionInText("MyNamespace.MyOtherNamespace.MyClass", "MyOtherNamespace.MyClass", "MyOtherNamespace.MyNewClass");
        assert.equal(result, "MyNamespace.MyOtherNamespace.MyClass");
    });
});
