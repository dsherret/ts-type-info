import CodeBlockWriter from "code-block-writer";
import {BaseDefinition} from "./../../../definitions";

export abstract class BaseDefinitionBinder {
    abstract getOnBeforeWrite(): ((writer: CodeBlockWriter) => void) | null;
    abstract getOnAfterWrite(): ((writer: CodeBlockWriter) => void) | null;

    bind(def: BaseDefinition) {
        def.onBeforeWrite = this.getOnBeforeWrite();
        def.onAfterWrite = this.getOnAfterWrite();
    }
}
