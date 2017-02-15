import CodeBlockWriter from "code-block-writer";
import {BaseDefinition} from "./../definitions";

export class BaseDefinitionWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    writeWrap(def: BaseDefinition, action: () => void) {
        if (typeof def.onBeforeWrite === "function")
            def.onBeforeWrite(this.writer);

        action();

        if (typeof def.onAfterWrite === "function")
            def.onAfterWrite(this.writer);
    }
}
