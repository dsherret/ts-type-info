import CodeBlockWriter from "code-block-writer";
import {DecoratorDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class DecoratorWriter {
    constructor(
        private writer: CodeBlockWriter,
        private baseDefinitionWriter: BaseDefinitionWriter
    ) {
    }

    write(def: DecoratorDefinition, flags: WriteFlags) {
        if (flags & WriteFlags.HideFunctionImplementations)
            return;

        this.baseDefinitionWriter.writeWrap(def, () => {
            this.writer.write("@");
            this.writer.write(def.name);
            if (def.isDecoratorFactory)
                this.writeArgs(def);
        });
    }

    private writeArgs(def: DecoratorDefinition) {
        this.writer.write("(");
        def.arguments.forEach((arg, i) => {
            this.writer.conditionalWrite(i !== 0, ", ");
            this.writer.write(arg.text);
        });
        this.writer.write(")");
    }
}
