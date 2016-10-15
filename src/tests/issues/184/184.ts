import * as path from "path";
import * as assert from "assert";
import * as ts from "typescript";
import {getInfoFromFiles} from "./../../../main";

describe("Issue #184", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/issues/184/testFile.ts");
    const result = getInfoFromFiles([fileName], { includeCompilerNodes: true });
    const classDef = result.getFile("testFile.ts")!.getClass("MyClass")!;

    classDef.methods.forEach(methodDef => {
        const methodNode = methodDef.tsNode! as ts.MethodDeclaration;

        methodDef.onWriteFunctionBody = writer => {
            methodNode.body!.statements.forEach(statement => {
                writer.writeLine(statement.getText());
            });
        };
    });

    it("should write out the class with the method statements", () => {
        const expected =
`export class MyClass {
    myMethod() {
        const myString = "some string";
        return myString;
    }
}
`;
        assert.equal(classDef.write(), expected);
    });
});
