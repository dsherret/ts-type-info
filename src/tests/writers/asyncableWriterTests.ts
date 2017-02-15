import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {AsyncableDefinition} from "./../../definitions";
import {AsyncableWriter} from "./../../writers";

describe(nameof(AsyncableWriter), () => {
    class MockAsyncableDefinition extends AsyncableDefinition {
    }

    function getWriteResult(isAsync: boolean) {
        const writer = new CodeBlockWriter();
        const defWriter = new AsyncableWriter(writer);
        const def = new MockAsyncableDefinition();
        def.isAsync = isAsync;
        defWriter.writeAsyncKeyword(def);
        return writer.toString();
    }

    describe(nameof<AsyncableWriter>(w => w.writeAsyncKeyword), () => {
        it("should write when is async", () => {
            expect(getWriteResult(true)).to.equal("async ");
        });

        it("should not write anything when not async", () => {
            expect(getWriteResult(false)).to.equal("");
        });
    });
});
