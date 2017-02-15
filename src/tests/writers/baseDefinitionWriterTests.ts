import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {BaseDefinition} from "./../../definitions";
import {BaseDefinitionWriter} from "./../../writers";

describe(nameof(BaseDefinitionWriter), () => {
    class MockBaseDefinition extends BaseDefinition {
    }

    function createObjects() {
        const writer = new CodeBlockWriter();
        const defWriter = new BaseDefinitionWriter(writer);
        const def = new MockBaseDefinition();
        return {writer, defWriter, def};
    }

    describe(nameof<BaseDefinitionWriter>(w => w.writeWrap), () => {
        it("should do the onBeforeWrite action, then the callback, then the onAfterWrite action", () => {
            const {writer, defWriter, def} = createObjects();
            def.onBeforeWrite = w => w.write("start");
            def.onAfterWrite = w => w.write("end");
            defWriter.writeWrap(def, () => writer.write("middle"));
            expect(writer.toString()).to.equal("startmiddleend");
        });

        it("should not do onBeforeWrite or onAfterWrite if they are not specified", () => {
            const {writer, defWriter, def} = createObjects();
            defWriter.writeWrap(def, () => writer.write("middle"));
            expect(writer.toString()).to.equal("middle");
        });
    });
});
