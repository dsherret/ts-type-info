import CodeBlockWriter from "code-block-writer";
import {ClassPropertyDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseClassPropertyBinder} from "./base";

export abstract class ClassPropertyBinder implements IBaseBinder {
    constructor(private baseClassPropertyBinder: BaseClassPropertyBinder) {
    }

    abstract getIsAccessor(): boolean;
    abstract getIsReadonly(): boolean;
    abstract getOnWriteGetBody(): ((writer: CodeBlockWriter) => void) | null;
    abstract getOnWriteSetBody(): ((writer: CodeBlockWriter) => void) | null;

    bind(def: ClassPropertyDefinition) {
        this.baseClassPropertyBinder.bind(def);
        def.isAccessor = this.getIsAccessor();
        def.isReadonly = this.getIsReadonly();
        def.onWriteGetBody = this.getOnWriteGetBody();
        def.onWriteSetBody = this.getOnWriteSetBody();
    }
}
