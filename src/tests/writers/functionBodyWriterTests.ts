import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {FunctionDefinition, InterfaceMethodDefinition, ClassMethodDefinition} from "./../../definitions";
import {FunctionBodyWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";

describe(nameof(FunctionBodyWriter), () => {
    function createObjects() {
        const writer = new CodeBlockWriter();
        const defWriter = new FunctionBodyWriter(writer);
        return {writer, defWriter};
    }

    describe(nameof<FunctionBodyWriter>(w => w.write), () => {
        it("should write out the function body when it's defined", () => {
            const def = new FunctionDefinition();
            def.onWriteFunctionBody = writer => writer.write("body");
            const {writer, defWriter} = createObjects();
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal("{\n    body\n}\n");
        });

        it("should write out the function body when it's not defined", () => {
            const def = new FunctionDefinition();
            const {writer, defWriter} = createObjects();
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal("{\n}\n");
        });

        it(`should not write out the function body if it's ambient`, () => {
            const def = new FunctionDefinition();
            def.isAmbient = true;
            const {writer, defWriter} = createObjects();
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(";");
        });

        it(`should not write out the function body if it's abstract`, () => {
            const def = new ClassMethodDefinition();
            def.isAbstract = true;
            const {writer, defWriter} = createObjects();
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(";");
        });

        it(`should not write out the function body if ${nameof(WriteFlags.HideFunctionBodies)} is set`, () => {
            const def = new FunctionDefinition();
            const {writer, defWriter} = createObjects();
            defWriter.write(def, WriteFlags.HideFunctionBodies);
            expect(writer.toString()).to.equal(";");
        });

        it(`should not write out the function body if it is an ${nameof(InterfaceMethodDefinition)}`, () => {
            const def = new InterfaceMethodDefinition();
            const {writer, defWriter} = createObjects();
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(";");
        });
    });
});
