import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";

export interface IParameteredDefinition<ParameterType> {
    fillParametersBySymbol(symbolNode: WrappedSymbolNode, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>): void;
    fillParametersBySignature(signature: WrappedSignature, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>): void;
    parameters: ParameterType[];
}

export abstract class ParameteredDefinition<ParameterType> implements IParameteredDefinition<ParameterType> {
    parameters: ParameterType[];

    fillParametersBySymbol(symbolNode: WrappedSymbolNode, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) {
        this.parameters = symbolNode.getParameters().map(param => new paramDefinition(param, this));
    }

    fillParametersBySignature(signature: WrappedSignature, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) {
        this.parameters = signature.getParameters().map(param => new paramDefinition(param, this));
    }
}
