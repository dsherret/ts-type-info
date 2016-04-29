import CodeBlockWriter from "code-block-writer";
import {BaseClassPropertyStructure} from "./base";

export interface ClassPropertyStructure extends BaseClassPropertyStructure {
    isAccessor?: boolean;
    isReadonly?: boolean;
    isConstructorParameter?: boolean;
    onWriteGetBody?: (writer: CodeBlockWriter) => void;
    onWriteSetBody?: (writer: CodeBlockWriter) => void;
}
