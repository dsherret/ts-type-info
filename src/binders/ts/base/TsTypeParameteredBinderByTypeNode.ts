import {TsTypeNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeParameteredBinder} from "./../../base";

export class TsTypeParameteredBinderByTypeNode extends TypeParameteredBinder {
    constructor(private readonly factory: TsFactory, private readonly typeNode: TsTypeNode) {
        super();
    }

    getTypeParameters() {
        return this.typeNode.getTypeParameterNodes().map(typeParam => this.factory.getTypeParameter(typeParam));
    }
}
