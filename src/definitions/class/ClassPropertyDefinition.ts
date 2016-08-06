import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {DefinitionType, AbstractableDefinition} from "./../base";
import {BaseClassPropertyDefinition} from "./base";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition implements AbstractableDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;

    onWriteGetBody: ((writer: CodeBlockWriter) => void) | null;
    onWriteSetBody: ((writer: CodeBlockWriter) => void) | null;

    constructor() {
        super(DefinitionType.ClassProperty);
    }

    // AbstractableDefinition
    isAbstract: boolean;
}

applyMixins(ClassPropertyDefinition, BaseClassPropertyDefinition, [AbstractableDefinition]);
