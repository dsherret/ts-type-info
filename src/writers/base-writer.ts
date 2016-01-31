import CodeBlockWriter from "code-block-writer";
import {IExportableDefinition, IAmbientableDefinition} from "./../definitions";

export abstract class BaseWriter {
    constructor(protected writer: CodeBlockWriter) {
    }

    protected writeExportClause(def: IExportableDefinition) {
        if (def.isExported && !def.isDefaultExportOfFile && !(def as any as IAmbientableDefinition).isAmbient) {
            this.writer.write("export ");
        }
    }

    protected writeDeclareClause(def: IAmbientableDefinition) {
        if (def.hasDeclareKeyword) {
            this.writer.write("declare ");
        }
    }
}
