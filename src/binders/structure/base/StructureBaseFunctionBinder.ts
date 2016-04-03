import {BaseParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {BaseFunctionStructure, BaseParameterStructure} from "./../../../structures";
import {BaseFunctionBinder} from "./../../base";
import {StructureNamedBinder} from "./StructureNamedBinder";
import {StructureTypeParameteredBinder} from "./StructureTypeParameteredBinder";
import {StructureParameteredBinder, StructureParameterBinderConstructor} from "./StructureParameteredBinder";
import {StructureReturnTypedBinder} from "./StructureReturnTypedBinder";

export class StructureBaseFunctionBinder<ParameterType extends BaseParameterDefinition, StructureParameterType extends BaseParameterStructure>
        extends BaseFunctionBinder<ParameterType> {
    constructor(
        factory: StructureFactory,
        structure: BaseFunctionStructure<StructureParameterType>,
        paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        paramBinder: StructureParameterBinderConstructor<ParameterType>
    ) {
        super(
            new StructureNamedBinder(structure),
            new StructureTypeParameteredBinder(factory, structure),
            new StructureParameteredBinder(structure, paramDefinition, paramBinder),
            new StructureReturnTypedBinder(factory, structure)
        );
    }
}
