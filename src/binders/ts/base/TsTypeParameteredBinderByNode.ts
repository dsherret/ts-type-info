import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeParameteredBinder} from "./../../base";

export class TsTypeParameteredBinderByNode extends TypeParameteredBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super();
    }

    getTypeParameters() {
        return this.node.getTypeParameters().map(typeParam => this.factory.getTypeParameter(typeParam));
    }
}
