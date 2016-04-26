import CodeBlockWriter from "code-block-writer";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;

    onWriteGetBody: (writer: CodeBlockWriter) => void;
    onWriteSetBody: (writer: CodeBlockWriter) => void;

    constructor() {
        super(DefinitionType.ClassProperty);
    }
}
