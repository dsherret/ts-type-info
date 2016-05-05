import {StructureFactory} from "./../../factories";
import {TypeParameterStructure} from "./../../structures";
import {DefinitionUtils} from "./../../utils";
import {TypeParameterDefinition} from "./../general";

export abstract class TypeParameteredDefinition {
    typeParameters: TypeParameterDefinition[] = [];

    addTypeParameters(...typeParameters: TypeParameterStructure[]) {
        const factory = new StructureFactory();
        this.typeParameters.push(...typeParameters.map(t => factory.getTypeParameter(t)));
        return this;
    }

    getTypeParameter(nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.typeParameters, nameOrSearchFunction);
    }
}
