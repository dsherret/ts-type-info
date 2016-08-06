import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {DefinitionType, AbstractableDefinition} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassPropertyKind} from "./ClassPropertyKind";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition implements AbstractableDefinition {
    kind: ClassPropertyKind;
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
