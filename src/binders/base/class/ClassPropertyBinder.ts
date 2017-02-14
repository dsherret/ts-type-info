import CodeBlockWriter from "code-block-writer";
import {ClassPropertyDefinition, ClassPropertyKind} from "./../../../definitions";
import {AbstractableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseClassPropertyBinder} from "./base";

export abstract class ClassPropertyBinder implements IBaseBinder {
    constructor(
        private readonly baseClassPropertyBinder: BaseClassPropertyBinder,
        private readonly abstractableBinder: AbstractableBinder
    ) {
    }

    abstract getIsConstructorParameter(): boolean;
    abstract getKind(): ClassPropertyKind;
    abstract getOnWriteGetBody(): ((writer: CodeBlockWriter) => void) | null;
    abstract getOnWriteSetBody(): ((writer: CodeBlockWriter) => void) | null;

    bind(def: ClassPropertyDefinition) {
        this.baseClassPropertyBinder.bind(def);
        this.abstractableBinder.bind(def);
        def.isConstructorParameter = this.getIsConstructorParameter();
        def.kind = this.getKind();
        def.onWriteGetBody = this.getOnWriteGetBody();
        def.onWriteSetBody = this.getOnWriteSetBody();
    }
}
