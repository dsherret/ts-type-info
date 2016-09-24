import {CallSignatureDefinition, TypeDefinition, TypeNodeDefinition} from "./../../../definitions";
import {BaseTypeBinder} from "./base";

export abstract class TypeBinder {
    abstract getCallSignatures(): CallSignatureDefinition[];
    abstract getTypeNode(): TypeNodeDefinition | null;

    constructor(private readonly baseTypeBinder: BaseTypeBinder) {
    }

    bind(def: TypeDefinition) {
        this.baseTypeBinder.bind(def);
        def.callSignatures.push(...this.getCallSignatures());
        def.node = this.getTypeNode();
    }
}
