import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {ClassConstructorParameterScope} from "./../../definitions";
import {ClassConstructorParameterScopeWriter} from "./../../writers";

describe(nameof(ClassConstructorParameterScopeWriter), () => {
    function createObjects() {
        const writer = new CodeBlockWriter();
        const defWriter = new ClassConstructorParameterScopeWriter(writer);
        return {writer, defWriter};
    }

    describe(nameof<ClassConstructorParameterScopeWriter>(w => w.writeScope), () => {
        function doWriteTest(scope: ClassConstructorParameterScope, expectedText: string) {
            const {writer, defWriter} = createObjects();
            defWriter.writeScope(scope);
            expect(writer.toString()).to.equal(expectedText);
        }

        it("should write private for private", () => {
            doWriteTest(ClassConstructorParameterScope.Private, "private ");
        });

        it("should write protected for protected", () => {
            doWriteTest(ClassConstructorParameterScope.Protected, "protected ");
        });

        it("should write public for public", () => {
            doWriteTest(ClassConstructorParameterScope.Public, "public ");
        });

        it("should write nothing for invalid input", () => {
            doWriteTest(-1 as any, "");
        });

        it("should write nothing for null", () => {
            doWriteTest(null as any, "");
        });
    });
});
