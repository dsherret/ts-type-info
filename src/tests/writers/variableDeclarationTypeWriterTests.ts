import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {VariableDeclarationType} from "./../../definitions";
import {VariableDeclarationTypeWriter} from "./../../writers";

describe(nameof(VariableDeclarationTypeWriter), () => {
    function createObjects() {
        const writer = new CodeBlockWriter();
        const defWriter = new VariableDeclarationTypeWriter(writer);
        return {writer, defWriter};
    }

    describe(nameof<VariableDeclarationTypeWriter>(w => w.writeDeclarationType), () => {
        function doWriteTest(declarationType: VariableDeclarationType, expectedText: string) {
            const {writer, defWriter} = createObjects();
            defWriter.writeDeclarationType(declarationType);
            expect(writer.toString()).to.equal(expectedText);
        }

        it("should write var for var", () => {
            doWriteTest(VariableDeclarationType.Var, "var");
        });

        it("should write let for let", () => {
            doWriteTest(VariableDeclarationType.Let, "let");
        });

        it("should write const for const", () => {
            doWriteTest(VariableDeclarationType.Const, "const");
        });

        it("should write var for invalid input", () => {
            doWriteTest(-1 as any, "var");
        });
    });
});
