import {TsSignature} from "./../../../compiler";
import {TypeParameterDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TypeParameteredBinder} from "./../../base";
import {TsTypeParameterBinder} from "./../general";

export class TsTypeParameteredBinderBySignature extends TypeParameteredBinder {
    constructor(
        private tsFactory: TsFactory,
        private signature: TsSignature
    ) {
        super();
    }

    getTypeParameters() {
        return this.signature.getTypeParameters().map(typeParamSymbol => {
            const def = new TypeParameterDefinition();
            const binder = new TsTypeParameterBinder(this.tsFactory, typeParamSymbol.getOnlyNode());

            binder.bind(def);

            return def;
        });
    }
}
