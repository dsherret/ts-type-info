import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";
import {ArrayExt} from "./../../utils";

export interface IParameteredDefinition<ParameterType> {
    fillParametersBySymbol(symbolNode: WrappedSymbolNode, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>): void;
    fillParametersBySignature(signature: WrappedSignature, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>): void;
    parameters: ArrayExt<ParameterType>;
}

export abstract class ParameteredDefinition<ParameterType> implements IParameteredDefinition<ParameterType> {
    parameters: ArrayExt<ParameterType>;

    fillParametersBySymbol(symbolNode: WrappedSymbolNode, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) {
        this.parameters = new ArrayExt<ParameterType>(...symbolNode.getParameters().map(param => new paramDefinition(param, this)));
    }

    fillParametersBySignature(signature: WrappedSignature, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) {
        this.parameters = new ArrayExt<ParameterType>(...signature.getParameters().map(param => new paramDefinition(param, this)));
    }
}
