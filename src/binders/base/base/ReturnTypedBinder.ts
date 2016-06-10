import {ReturnTypedDefinition, TypeDefinition} from "./../../../definitions";

export abstract class ReturnTypedBinder {
    abstract getreturnType(): TypeDefinition;

    bind(def: ReturnTypedDefinition) {
        def.returnType = this.getreturnType();
    }
}
