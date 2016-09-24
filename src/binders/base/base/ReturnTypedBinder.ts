import {ReturnTypedDefinition, TypeDefinition} from "./../../../definitions";

export abstract class ReturnTypedBinder {
    abstract getReturnType(): TypeDefinition;

    bind(def: ReturnTypedDefinition) {
        def.returnType = this.getReturnType();
    }
}
