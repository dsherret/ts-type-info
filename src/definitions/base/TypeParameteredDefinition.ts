import {StructureFactory} from "./../../factories";
import {TypeParameterStructure} from "./../../structures";
import {TypeParameterDefinition} from "./../general";

export abstract class TypeParameteredDefinition {
    addTypeParameters(...typeParameters: TypeParameterStructure[]) {
        const factory = new StructureFactory();
        this.typeParameters.push(...typeParameters.map(t => factory.getTypeParameter(t)));
        return this;
    }

    typeParameters: TypeParameterDefinition[] = [];
}
