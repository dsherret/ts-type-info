import {MainFactory} from "./../../factories";
import {TypeParameterStructure} from "./../../structures";
import {DefinitionUtils} from "./../../utils";
import {TypeParameterDefinition} from "./../general";

export abstract class TypeParameteredDefinition {
    typeParameters: TypeParameterDefinition[] = [];

    addTypeParameter(structure: TypeParameterStructure) {
        const def = new MainFactory().createStructureFactory().getTypeParameter(structure);
        this.typeParameters.push(def);
        return def;
    }

    getTypeParameter(nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.typeParameters, nameOrSearchFunction);
    }
}
