import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";
import {BaseParameterStructure, ParameteredStructure} from "./../../structures";
import {ArrayExt} from "./../../utils";

export interface IParameteredDefinition<ParameterType, ParameterStructureType extends BaseParameterStructure> {
    fillParametersBySymbol(
        symbolNodeOrStructure: WrappedSymbolNode | ParameteredStructure<ParameterStructureType>,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType, ParameterStructureType>
    ): void;
    fillParametersBySignature(
        signatureOrStructure: WrappedSignature | ParameteredStructure<ParameterStructureType>,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType, ParameterStructureType>
    ): void;
    parameters: ArrayExt<ParameterType>;
}

export abstract class ParameteredDefinition<ParameterType, ParameterStructureType extends BaseParameterStructure>
        implements IParameteredDefinition<ParameterType, ParameterStructureType> {
    parameters: ArrayExt<ParameterType>;

    fillParametersBySymbol(
        symbolNodeOrStructure: WrappedSymbolNode | ParameteredStructure<ParameterStructureType>,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType, ParameterStructureType>
    ) {
        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.parameters = new ArrayExt<ParameterType>(...symbolNodeOrStructure.getParameters().map(param => new paramDefinition(param, this)));
        }
        else {
            this.fillParametersByStructure(symbolNodeOrStructure, paramDefinition);
        }
    }

    fillParametersBySignature(
        signatureOrStructure: WrappedSignature | ParameteredStructure<ParameterStructureType>,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType, ParameterStructureType>
    ) {
        if (signatureOrStructure instanceof WrappedSignature) {
            this.parameters = new ArrayExt<ParameterType>(...signatureOrStructure.getParameters().map(param => new paramDefinition(param, this)));
        }
        else {
            this.fillParametersByStructure(signatureOrStructure, paramDefinition);
        }
    }

    private fillParametersByStructure(structure: ParameteredStructure<ParameterStructureType>, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType, ParameterStructureType>) {
        this.parameters = new ArrayExt<ParameterType>(...(structure.parameters || []).map(param => new paramDefinition(param, this)));
    }
}
