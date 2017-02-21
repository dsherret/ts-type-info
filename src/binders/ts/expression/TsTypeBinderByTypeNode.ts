import {TsTypeNode} from "./../../../compiler";
import {CallSignatureDefinition, TypeNodeDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TypeBinder} from "./../../base";
import {TsBaseTypeBinderByTypeNode} from "./base";

export class TsTypeBinderByTypeNode extends TypeBinder {
    constructor(private readonly factory: TsFactory, private readonly tsTypeNode: TsTypeNode) {
        super(new TsBaseTypeBinderByTypeNode(factory, tsTypeNode));
    }

    getCallSignatures() {
        // todo: should this return an empty array?
        return [] as CallSignatureDefinition[];
    }

    getTypeNode() {
        return null as TypeNodeDefinition | null;
    }
}
