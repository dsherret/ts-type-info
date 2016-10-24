import {DecoratorDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class DecoratorWriter extends BaseDefinitionWriter<DecoratorDefinition> {
    write(def: DecoratorDefinition, flags: WriteFlags) {
        super.write(def, flags);
        this.writer.newLine();
    }

    writeInline(def: DecoratorDefinition, flags: WriteFlags) {
        super.writeInline(def, flags);
        this.writer.write(" ");
    }

    protected writeDefault(def: DecoratorDefinition, flags: WriteFlags) {
        if (flags & WriteFlags.HideFunctionImplementations)
            return;

        this.writer.write("@");
        this.writer.write(def.name);
        if (def.isDecoratorFactory)
            this.writeArgs(def);
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
