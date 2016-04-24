import CodeBlockWriter from "code-block-writer";
import {BaseDefinition} from "./../../../definitions";

export abstract class BaseDefinitionBinder {
    abstract getOnBeforeWrite(): (writer: CodeBlockWriter) => void;
    abstract getOnAfterWrite(): (writer: CodeBlockWriter) => void;

    bind(def: BaseDefinition) {
        def.onBeforeWrite = this.getOnBeforeWrite();
        def.onAfterWrite = this.getOnAfterWrite();
    }
}
