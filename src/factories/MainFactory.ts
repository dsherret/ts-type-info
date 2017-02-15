import CodeBlockWriter from "code-block-writer";
import {WriteOptions} from "./../WriteOptions";
import {WriterFactory} from "./WriterFactory";

export class MainFactory {
    // todo: make an instance member
    static createWriter(writeOptions: WriteOptions | undefined) {
        return new CodeBlockWriter(writeOptions);
    }

    // todo: rename to createWriterFactory
    static createWriteFactory(writer: CodeBlockWriter) {
        return new WriterFactory(writer);
    }
}
