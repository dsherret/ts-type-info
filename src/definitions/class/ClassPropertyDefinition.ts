import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {AbstractableDefinition} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassPropertyKind} from "./ClassPropertyKind";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition implements AbstractableDefinition {
    kind: ClassPropertyKind;
    isConstructorParameter: boolean;

    onWriteGetBody: ((writer: CodeBlockWriter) => void) | null;
    onWriteSetBody: ((writer: CodeBlockWriter) => void) | null;

    // AbstractableDefinition
    isAbstract: boolean;
}

applyMixins(ClassPropertyDefinition, BaseClassPropertyDefinition, [AbstractableDefinition]);
