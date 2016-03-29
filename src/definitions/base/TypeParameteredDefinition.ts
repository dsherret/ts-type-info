import {StructureFactory} from "./../../factories";
import {TypeParameterStructure} from "./../../structures";
import {TypeParameterDefinition} from "./../general";

export abstract class TypeParameteredDefinition {
    addTypeParameters(...typeParameters: TypeParameterStructure[]) {
        const factory = new StructureFactory();
        typeParameters.forEach(typeParameter => {
            const def = factory.getTypeParameter(typeParameter);
            def.parent = this as any;
            this.typeParameters.push(def);
        });
        return this;
    }

    typeParameters: TypeParameterDefinition[] = [];
}
