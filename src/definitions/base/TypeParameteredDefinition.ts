import {StructureFactory} from "./../../factories";
import {TypeParameterStructure} from "./../../structures";
import {TypeParameterDefinition} from "./../general";

export abstract class TypeParameteredDefinition {
    addTypeParameters(...typeParameters: TypeParameterStructure[]) {
        const factory = new StructureFactory();
        typeParameters.forEach(typeParameter => this.typeParameters.push(factory.getTypeParameter(typeParameter)));
        return this;
    }

    typeParameters: TypeParameterDefinition[] = [];
}
