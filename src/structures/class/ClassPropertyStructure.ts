import CodeBlockWriter from "code-block-writer";
import {AbstractableStructure} from "./../base";
import {BaseClassPropertyStructure} from "./base";

export interface ClassPropertyStructure extends BaseClassPropertyStructure, AbstractableStructure {
    isAccessor?: boolean;
    isReadonly?: boolean;
    onWriteGetBody?: (writer: CodeBlockWriter) => void;
    onWriteSetBody?: (writer: CodeBlockWriter) => void;
}
