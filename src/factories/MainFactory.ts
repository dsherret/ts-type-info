import CodeBlockWriter from "code-block-writer";
import {WriteOptions} from "./../WriteOptions";
import {WriterFactory} from "./WriterFactory";
import {TsFactory, TsFactoryOptions} from "./TsFactory";
import {StructureFactory} from "./StructureFactory";

// todo: make all instance members
export class MainFactory {
    createTsFactory(options: TsFactoryOptions) {
        return new TsFactory(this, options);
    }

    createStructureFactory() {
        return new StructureFactory();
    }

    static createWriter(writeOptions: WriteOptions | undefined) {
        return new CodeBlockWriter(writeOptions);
    }

    // todo: rename to createWriterFactory
    static createWriteFactory(writer: CodeBlockWriter) {
        return new WriterFactory(writer);
    }
}
