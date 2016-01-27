import {FileDefinition} from "./../definitions";
import {BaseWriter} from "./base-writer";
import {ModuledWriter} from "./moduled-writer";
import {WriteFlags} from "./../write-flags";

export class FileWriter extends BaseWriter {
    private moduledWriter = new ModuledWriter(this.writer);

    write(def: FileDefinition, flags: WriteFlags) {
        this.moduledWriter.write(def, flags);
    }
}
