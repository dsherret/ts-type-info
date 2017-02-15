import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {DecoratableDefinition} from "./../../definitions";
import {DecoratorsWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(DecoratorsWriter), () => {
    class MockDecoratableDefinition extends DecoratableDefinition {
    }

    function createObjects(def: DecoratableDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new DecoratorsWriter(
            writer,
            mocks.getDecoratorWriter(writer));
        return {writer, defWriter};
    }

    describe(nameof<DecoratorsWriter>(w => w.write), () => {
        it("should write out the decorator", () => {
            const def = new MockDecoratableDefinition();
            def.addDecorator({
                name: "t"
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`{decorator:t:0}\n`);
        });

        it("should write out the decorators separated by newlines", () => {
            const def = new MockDecoratableDefinition();
            def.addDecorator({
                name: "t"
            });
            def.addDecorator({
                name: "u"
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`{decorator:t:0}\n{decorator:u:0}\n`);
        });
    });
});
