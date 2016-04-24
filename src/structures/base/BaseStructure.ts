import CodeBlockWriter from "code-block-writer";

export interface BaseStructure {
    onBeforeWrite?: (writer: CodeBlockWriter) => void;
    onAfterWrite?: (writer: CodeBlockWriter) => void;
}
