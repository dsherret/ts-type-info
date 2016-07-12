import * as assert from "assert";
import {indexOfAllDefinitionsInText} from "./../../../utils/definitionRenamer/indexOfAllDefinitionsInText";

describe("indexOfAllDefinitionsInText", () => {
    it("should find the name outside type parameters", () => {
        const result = indexOfAllDefinitionsInText("MyClass<any, MyOtherClass>", "MyClass");
        assert.deepEqual(result, [0]);
    });

    it("should find the name inside type parameters", () => {
        const result = indexOfAllDefinitionsInText("MyClass<any, MyOtherClass>", "MyOtherClass");
        assert.deepEqual(result, [13]);
    });

    it("should find multiple names", () => {
        const result = indexOfAllDefinitionsInText("MyClass<any, MyClass>", "MyClass");
        assert.deepEqual(result, [0, 13]);
    });

    it("should find at beginning of string", () => {
        const result = indexOfAllDefinitionsInText("MyClass1 | MyClass2", "MyClass1");
        assert.deepEqual(result, [0]);
    });

    it("should find at end of string", () => {
        const result = indexOfAllDefinitionsInText("MyClass1 | MyClass2", "MyClass2");
        assert.deepEqual(result, [11]);
    });

    it("should find in intersection and union type", () => {
        const result = indexOfAllDefinitionsInText("(MyClass1 & MyClass2) | MyClass2", "MyClass2");
        assert.deepEqual(result, [12, 24]);
    });

    it("should not find a definition when it doesn't match exactly on the left", () => {
        const result = indexOfAllDefinitionsInText("MyTestClass", "TestClass");
        assert.deepEqual(result, []);
    });

    it("should not rename a definition when it doesn't match exactly on the right", () => {
        const result = indexOfAllDefinitionsInText("MyTestClass", "MyTest");
        assert.deepEqual(result, []);
    });

    it("should find a namespace when it matches exactly", () => {
        const result = indexOfAllDefinitionsInText("MyNamespace.MyClass", "MyNamespace.MyClass");
        assert.deepEqual(result, [0]);
    });

    it("should find a namespace when it matches from the left", () => {
        const result = indexOfAllDefinitionsInText("MyNamespace.MyOtherNamespace.MyClass", "MyNamespace.MyOtherNamespace");
        assert.deepEqual(result, [0]);
    });

    it("should NOT find a namespace when it matches from the right", () => {
        const result = indexOfAllDefinitionsInText("MyNamespace.MyOtherNamespace.MyClass", "MyOtherNamespace.MyClass");
        assert.deepEqual(result, []);
    });

    it("should NOT find in single quotes", () => {
        const result = indexOfAllDefinitionsInText(`'MyNamespace'`, "MyNamespace");
        assert.deepEqual(result, []);
    });

    it("should NOT find in double quotes", () => {
        const result = indexOfAllDefinitionsInText(`"MyNamespace"`, "MyNamespace");
        assert.deepEqual(result, []);
    });

    it("should NOT find in back tick quotes", () => {
        const result = indexOfAllDefinitionsInText("`MyNamespace`", "MyNamespace");
        assert.deepEqual(result, []);
    });

    it("should find in back tick quotes' ${}", () => {
        const result = indexOfAllDefinitionsInText("`MyNamespace${MyNamespace}MyNamespace`", "MyNamespace");
        assert.deepEqual(result, [14]);
    });

    it("should handle backslashes in single quotes", () => {
        const result = indexOfAllDefinitionsInText(`'MyNamespace\\'MyNamespace'`, "MyNamespace");
        assert.deepEqual(result, []);
    });

    it("should handle backslashes in double quotes", () => {
        const result = indexOfAllDefinitionsInText(`"MyNamespace\\"MyNamespace"`, "MyNamespace");
        assert.deepEqual(result, []);
    });
});
