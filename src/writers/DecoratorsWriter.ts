import CodeBlockWriter from "code-block-writer";
import {WriteFlags} from "./../WriteFlags";
import {DecoratableDefinition} from "./../definitions";
import {DecoratorWriter} from "./DecoratorWriter";

export class DecoratorsWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly decoratorWriter: DecoratorWriter
    ) {
    }

    write(def: DecoratableDefinition, flags: WriteFlags, separator: string | null = null) {
        if (def.decorators == null)
            return;

        def.decorators.forEach(dec => {
            this.decoratorWriter.write(dec, flags);
            if (separator == null)
                this.writer.newLine();
            else
                this.writer.write(separator);
        });
    }
}
