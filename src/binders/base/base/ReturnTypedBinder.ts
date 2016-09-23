import {ReturnTypedDefinition, TypeNodeDefinition} from "./../../../definitions";

export abstract class ReturnTypedBinder {
    abstract getReturnType(): TypeNodeDefinition;

    bind(def: ReturnTypedDefinition) {
        def.returnType = this.getReturnType();
    }
}
