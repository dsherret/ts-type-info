import {TsSignature} from "./../../../compiler"
import {TypeParameterDefinition, TypeParameteredDefinition} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {TypeParameteredBinder} from "./../../base";
import {TsTypeParameterBinder} from "./../general";

export class TsTypeParameteredBinderBySignature extends TypeParameteredBinder {
    constructor(
        private mainFactory: MainFactory,
        private signature: TsSignature
    ) {
        super();
    }

    getTypeParameters() {
        return this.signature.getTypeParameters().map(typeParamSymbol => {
            const def = new TypeParameterDefinition<TypeParameteredDefinition>();
            const binder = new TsTypeParameterBinder(this.mainFactory, typeParamSymbol.getOnlyNode());

            binder.bind(def);

            return def;
        });
    }
}
