import CodeBlockWriter from "code-block-writer";
import {ClassPropertyKind} from "./../../definitions";
import {AbstractableStructure} from "./../base";
import {BaseClassPropertyStructure} from "./base";

export interface ClassPropertyStructure extends BaseClassPropertyStructure, AbstractableStructure {
    kind?: ClassPropertyKind;
    onWriteGetBody?: (writer: CodeBlockWriter) => void;
    onWriteSetBody?: (writer: CodeBlockWriter) => void;
}
