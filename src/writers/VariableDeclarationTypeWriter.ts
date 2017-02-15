import CodeBlockWriter from "code-block-writer";
import {VariableDeclarationType} from "./../definitions";

export class VariableDeclarationTypeWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    writeDeclarationType(declarationType: VariableDeclarationType) {
        switch (declarationType) {
            case VariableDeclarationType.Let:
                this.writer.write("let");
                break;
            case VariableDeclarationType.Const:
                this.writer.write("const");
                break;
            default:
                this.writer.write("var");
                break;
        }
    }
}
