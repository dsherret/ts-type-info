import CodeBlockWriter from "code-block-writer";

export class FunctionBodyWriteableDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
}
