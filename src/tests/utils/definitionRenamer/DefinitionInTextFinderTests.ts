import * as assert from "assert";
import {DefinitionInTextFinder} from "./../../../utils/definitionRenamer/DefinitionInTextFinder";

describe("DefinitionInTextFinder", () => {
    it("should find the name outside type parameters", () => {
        const result = new DefinitionInTextFinder("MyClass<any, MyOtherClass>").indexOfAll("MyClass");
        assert.deepEqual(result, [0]);
    });

    it("should find the name inside type parameters", () => {
        const result = new DefinitionInTextFinder("MyClass<any, MyOtherClass>").indexOfAll("MyOtherClass");
        assert.deepEqual(result, [13]);
    });

    it("should find multiple names", () => {
        const result = new DefinitionInTextFinder("MyClass<any, MyClass>").indexOfAll("MyClass");
        assert.deepEqual(result, [0, 13]);
    });

    it("should find at beginning of string", () => {
        const result = new DefinitionInTextFinder("MyClass1 | MyClass2").indexOfAll("MyClass1");
        assert.deepEqual(result, [0]);
    });

    it("should find at end of string", () => {
        const result = new DefinitionInTextFinder("MyClass1 | MyClass2").indexOfAll("MyClass2");
        assert.deepEqual(result, [11]);
    });

    it("should find in intersection and union type", () => {
        const result = new DefinitionInTextFinder("(MyClass1 & MyClass2) | MyClass2").indexOfAll("MyClass2");
        assert.deepEqual(result, [12, 24]);
    });

    it("should not find a definition when it doesn't match exactly on the left", () => {
        const result = new DefinitionInTextFinder("MyTestClass").indexOfAll("TestClass");
        assert.deepEqual(result, []);
    });

    it("should not rename a definition when it doesn't match exactly on the right", () => {
        const result = new DefinitionInTextFinder("MyTestClass").indexOfAll("MyTest");
        assert.deepEqual(result, []);
    });

    it("should find a namespace when it matches exactly", () => {
        const result = new DefinitionInTextFinder("MyNamespace.MyClass").indexOfAll("MyNamespace.MyClass");
        assert.deepEqual(result, [0]);
    });

    it("should find a namespace when it matches from the left", () => {
        const result = new DefinitionInTextFinder("MyNamespace.MyOtherNamespace.MyClass").indexOfAll("MyNamespace.MyOtherNamespace");
        assert.deepEqual(result, [0]);
    });

    it("should NOT find a namespace when it matches from the right", () => {
        const result = new DefinitionInTextFinder("MyNamespace.MyOtherNamespace.MyClass").indexOfAll("MyOtherNamespace.MyClass");
        assert.deepEqual(result, []);
    });

    it("should NOT find in single quotes", () => {
        const result = new DefinitionInTextFinder(`'MyNamespace'`).indexOfAll("MyNamespace");
        assert.deepEqual(result, []);
    });

    it("should NOT find in double quotes", () => {
        const result = new DefinitionInTextFinder(`"MyNamespace"`).indexOfAll("MyNamespace");
        assert.deepEqual(result, []);
    });

    it("should NOT find in back tick quotes", () => {
        const result = new DefinitionInTextFinder("`MyNamespace`").indexOfAll("MyNamespace");
        assert.deepEqual(result, []);
    });

    it("should find in back tick quotes' ${}", () => {
        const result = new DefinitionInTextFinder("`MyNamespace${MyNamespace}MyNamespace`").indexOfAll("MyNamespace");
        assert.deepEqual(result, [14]);
    });

    it("should handle backslashes in single quotes", () => {
        const result = new DefinitionInTextFinder(`'MyNamespace\\'MyNamespace'`).indexOfAll("MyNamespace");
        assert.deepEqual(result, []);
    });

    it("should handle backslashes in double quotes", () => {
        const result = new DefinitionInTextFinder(`"MyNamespace\\"MyNamespace"`).indexOfAll("MyNamespace");
        assert.deepEqual(result, []);
    });
});
