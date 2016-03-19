import {TsNode} from "./../../../compiler";
import {TypeParameterDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TypeParameteredBinder} from "./../../base";
import {TsTypeParameterBinder} from "./../general";

export class TsTypeParameteredBinderByNode extends TypeParameteredBinder {
    constructor(
        private tsFactory: TsFactory,
        private node: TsNode
    ) {
        super();
    }

    getTypeParameters() {
        return this.node.getTypeParameters().map(typeParam => {
            const def = new TypeParameterDefinition();
            const binder = new TsTypeParameterBinder(this.tsFactory, typeParam);

            binder.bind(def);

            return def;
        });
    }
}
