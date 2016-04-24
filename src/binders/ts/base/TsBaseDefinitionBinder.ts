import CodeBlockWriter from "code-block-writer";
import {BaseDefinitionBinder} from "./../../base";

export class TsBaseDefinitionBinder extends BaseDefinitionBinder {
    constructor() {
        super();
    }

    getOnBeforeWrite() {
        return null as (writer: CodeBlockWriter) => void;
    }

    getOnAfterWrite() {
        return null as (writer: CodeBlockWriter) => void;
    }
}
