import CodeBlockWriter from "code-block-writer";

export interface FunctionBodyWriteableStructure {
    onWriteFunctionBody?: (writer: CodeBlockWriter) => void;
}
