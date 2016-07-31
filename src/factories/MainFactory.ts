import CodeBlockWriter from "code-block-writer";
import {WriteOptions} from "./../WriteOptions";

export class MainFactory {
    static createWriter(writeOptions: WriteOptions | undefined) {
        return new CodeBlockWriter(writeOptions);
    }
}
