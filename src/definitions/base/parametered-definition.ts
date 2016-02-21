import {ISymbolNode, ISignature} from "./../../wrappers";
import {ArrayExt, MainCache} from "./../../utils";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";

export interface IParameteredDefinition<ParameterType> {
    fillParametersBySymbol(
        mainCache: MainCache,
        symbolNode: ISymbolNode,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ): void;
    fillParametersBySignature(
        mainCache: MainCache,
        signature: ISignature,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ): void;
    parameters: ArrayExt<ParameterType>;
}

export abstract class ParameteredDefinition<ParameterType>
        implements IParameteredDefinition<ParameterType> {
    parameters: ArrayExt<ParameterType>;

    fillParametersBySymbol(
        mainCache: MainCache,
        symbolNode: ISymbolNode,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) {
        this.parameters = new ArrayExt<ParameterType>(...symbolNode.getParameters().map(param => new paramDefinition(mainCache, param, this)));
    }

    fillParametersBySignature(
        mainCache: MainCache,
        signature: ISignature,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) {
        this.parameters = new ArrayExt<ParameterType>(...signature.getParameters().map(param => new paramDefinition(mainCache, param, this)));
    }
}
