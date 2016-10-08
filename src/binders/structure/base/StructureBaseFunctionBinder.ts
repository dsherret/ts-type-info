import * as definitions from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {BaseFunctionStructure, BaseParameterStructure} from "./../../../structures";
import {BaseFunctionBinder} from "./../../base";
import {StructureBaseDefinitionBinder} from "./StructureBaseDefinitionBinder";
import {StructureNamedBinder} from "./StructureNamedBinder";
import {StructureTypeParameteredBinder} from "./StructureTypeParameteredBinder";
import {StructureParameteredBinder, StructureParameterBinderConstructor} from "./StructureParameteredBinder";
import {StructureReturnTypedBinder} from "./StructureReturnTypedBinder";
import {StructureNodedBinder} from "./StructureNodedBinder";

export class StructureBaseFunctionBinder<ParameterType extends definitions.BaseParameterDefinition, StructureParameterType extends BaseParameterStructure>
        extends BaseFunctionBinder<ParameterType> {
    constructor(
        private readonly factory: StructureFactory,
        private readonly structure: BaseFunctionStructure<StructureParameterType>,
        paramDefinition: definitions.BaseParameterDefinitionConstructor<ParameterType>,
        paramBinder: StructureParameterBinderConstructor<ParameterType>
    ) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureTypeParameteredBinder(factory, structure),
            new StructureParameteredBinder(factory, structure, paramDefinition, paramBinder),
            new StructureReturnTypedBinder(factory, structure),
            new StructureNodedBinder()
        );
    }

    protected getIsGenerator() {
        return this.structure.isGenerator || false;
    }

    protected getOverloadSignatures() {
        return (this.structure.overloadSignatures || []).map(s => this.factory.getCallSignature(s));
    }

    protected getUserDefinedTypeGuard() {
        return null;
    }
}
