import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {Scope} from "./../../definitions";
import {ScopeWriter} from "./../../writers";

describe(nameof(ScopeWriter), () => {
    function createObjects() {
        const writer = new CodeBlockWriter();
        const defWriter = new ScopeWriter(writer);
        return {writer, defWriter};
    }

    describe(nameof<ScopeWriter>(w => w.writeScope), () => {
        function doWriteTest(scope: Scope, expectedText: string) {
            const {writer, defWriter} = createObjects();
            defWriter.writeScope(scope);
            expect(writer.toString()).to.equal(expectedText);
        }

        it("should write private for private", () => {
            doWriteTest(Scope.Private, "private ");
        });

        it("should write protected for protected", () => {
            doWriteTest(Scope.Protected, "protected ");
        });

        it("should write nothing for public", () => {
            doWriteTest(Scope.Public, "");
        });

        it("should write nothing for invalid input", () => {
            doWriteTest(-1 as any, "");
        });

        it("should write nothing for null", () => {
            doWriteTest(null as any, "");
        });
    });
});
