import CodeBlockWriter from "code-block-writer";
import {WriteOptions} from "./../WriteOptions";

export class MainFactory {
    static createWriter(writeOptions: WriteOptions) {
        return new CodeBlockWriter(writeOptions);
    }
}
