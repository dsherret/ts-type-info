import {TypeParameteredStructure} from "./../../../structures";
import {StructureFactory} from "./../../../factories";
import {TypeParameteredBinder} from "./../../base";

export class StructureTypeParameteredBinder extends TypeParameteredBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: TypeParameteredStructure) {
        super();
    }

    getTypeParameters() {
        return (this.structure.typeParameters || []).map(typeParam => this.factory.getTypeParameter(typeParam));
    }
}
