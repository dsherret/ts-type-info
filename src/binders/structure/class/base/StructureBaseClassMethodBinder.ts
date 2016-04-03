import {BaseClassMethodParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../../definitions";
import {StructureFactory} from "./../../../../factories";
import {BaseClassMethodStructure, BaseClassMethodParameterStructure} from "./../../../../structures";
import {BaseClassMethodBinder} from "./../../../base";
import {StructureDecoratableBinder, StructureBaseFunctionBinder, StructureParameterBinderConstructor} from "./../../base";
import {StructureScopedBinder} from "./StructureScopedBinder";

export class StructureBaseClassMethodBinder<ParameterType extends BaseClassMethodParameterDefinition, StructureParameterType extends BaseClassMethodParameterStructure>
        extends BaseClassMethodBinder<ParameterType> {
    constructor(
        factory: StructureFactory,
        structure: BaseClassMethodStructure<StructureParameterType>,
        paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        paramBinder: StructureParameterBinderConstructor<ParameterType>
    ) {
        super(
            new StructureBaseFunctionBinder(factory, structure, paramDefinition, paramBinder),
            new StructureDecoratableBinder(structure),
            new StructureScopedBinder(structure)
        );
    }
}
