import CodeBlockWriter from "code-block-writer";
import {UserDefinedTypeGuardDefinition} from "./../definitions";

export class UserDefinedTypeGuardWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    writeWithColon(def: UserDefinedTypeGuardDefinition) {
        this.writer.write(": ");
        this.write(def);
    }

    write(def: UserDefinedTypeGuardDefinition) {
        this.writer.write(`${def.parameterName || "this"} is ${def.type.text}`);
    }
}
