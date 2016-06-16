import * as assert from "assert";
import {renameDefinitionInText} from "./../../utils";

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
});
