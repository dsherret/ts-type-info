import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {ClassDefinition} from "./../../definitions";
import {ExtendsImplementsClauseWriter} from "./../../writers";

describe(nameof(ExtendsImplementsClauseWriter), () => {
    function createObjects(def: ClassDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new ExtendsImplementsClauseWriter(writer);
        return {writer, defWriter};
    }

    describe(nameof<ExtendsImplementsClauseWriter>(w => w.writeExtends), () => {
        it("should write out the extends clause", () => {
            const def = new ClassDefinition();
            def.addExtends("Test");
            const {writer, defWriter} = createObjects(def);
            defWriter.writeExtends(def);
            expect(writer.toString()).to.equal(` extends Test`);
        });

        it("should write out the extends clause when there are multiple", () => {
            const def = new ClassDefinition();
            def.addExtends("Test");
            def.addExtends("Test2");
            const {writer, defWriter} = createObjects(def);
            defWriter.writeExtends(def);
            expect(writer.toString()).to.equal(` extends Test, Test2`);
        });

        it("should write out array types in the form Array<T>", () => {
            const def = new ClassDefinition();
            def.addExtends("string[]");
            const {writer, defWriter} = createObjects(def);
            defWriter.writeExtends(def);
            expect(writer.toString()).to.equal(` extends Array<string>`);
        });
    });

    describe(nameof<ExtendsImplementsClauseWriter>(w => w.writeExtends), () => {
        it("should write out the implements clause", () => {
            const def = new ClassDefinition();
            def.addImplements("Test");
            const {writer, defWriter} = createObjects(def);
            defWriter.writeImplements(def);
            expect(writer.toString()).to.equal(` implements Test`);
        });

        it("should write out the implements clause when there are multiple", () => {
            const def = new ClassDefinition();
            def.addImplements("Test");
            def.addImplements("Test2");
            const {writer, defWriter} = createObjects(def);
            defWriter.writeImplements(def);
            expect(writer.toString()).to.equal(` implements Test, Test2`);
        });

        it("should write out array types in the form Array<T>", () => {
            const def = new ClassDefinition();
            def.addImplements("string[]");
            const {writer, defWriter} = createObjects(def);
            defWriter.writeImplements(def);
            expect(writer.toString()).to.equal(` implements Array<string>`);
        });
    });
});
