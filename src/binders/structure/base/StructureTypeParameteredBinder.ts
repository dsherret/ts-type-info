import {TypeParameteredStructure} from "./../../../structures";
import {TypeParameterDefinition, TypeParameteredDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {TypeParameteredBinder} from "./../../base";
import {StructureTypeParameterBinder} from "./../general";

export class StructureTypeParameteredBinder extends TypeParameteredBinder {
    constructor(
        private factory: StructureFactory,
        private structure: TypeParameteredStructure
    ) {
        super();
    }

    getTypeParameters() {
        return (this.structure.typeParameters || []).map(typeParam => {
            const def = new TypeParameterDefinition();
            const binder = new StructureTypeParameterBinder(this.factory, typeParam);

            binder.bind(def);

            return def;
        });
    }
}
