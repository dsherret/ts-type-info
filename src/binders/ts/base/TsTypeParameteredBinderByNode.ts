import {TsNode} from "./../../../compiler"
import {TypeParameterDefinition, TypeParameteredDefinition} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {TypeParameteredBinder} from "./../../base";
import {TsTypeParameterBinder} from "./../general";

export class TsTypeParameteredBinderByNode extends TypeParameteredBinder {
    constructor(
        private mainFactory: MainFactory,
        private node: TsNode
    ) {
        super();
    }

    getTypeParameters() {
        return this.node.getTypeParameters().map(typeParam => {
            const def = new TypeParameterDefinition<TypeParameteredDefinition>();
            const binder = new TsTypeParameterBinder(this.mainFactory, typeParam);

            binder.bind(def);

            return def;
        });
    }
}
