import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";
import {ExtendedArray} from "./../../utils";

export interface IParameteredDefinition<ParameterType> {
    fillParametersBySymbol(symbolNode: WrappedSymbolNode, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>): void;
    fillParametersBySignature(signature: WrappedSignature, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>): void;
    parameters: ExtendedArray<ParameterType>;
}

export abstract class ParameteredDefinition<ParameterType> implements IParameteredDefinition<ParameterType> {
    parameters: ExtendedArray<ParameterType>;

    fillParametersBySymbol(symbolNode: WrappedSymbolNode, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) {
        this.parameters = new ExtendedArray<ParameterType>(...symbolNode.getParameters().map(param => new paramDefinition(param, this)));
    }

    fillParametersBySignature(signature: WrappedSignature, paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>) {
        this.parameters = new ExtendedArray<ParameterType>(...signature.getParameters().map(param => new paramDefinition(param, this)));
    }
}
