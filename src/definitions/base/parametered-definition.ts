import {ISymbolNode, ISignature} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";

export interface IParameteredDefinition<ParameterType> {
    fillParametersBySymbol(
        definitionFactory: IDefinitionFactory,
        symbolNode: ISymbolNode,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ): void;
    fillParametersBySignature(
        definitionFactory: IDefinitionFactory,
        signature: ISignature,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ): void;
    parameters: ArrayExt<ParameterType>;
}

export abstract class ParameteredDefinition<ParameterType>
        implements IParameteredDefinition<ParameterType> {
    parameters: ArrayExt<ParameterType>;

    fillParametersBySymbol(
        definitionFactory: IDefinitionFactory,
        symbolNode: ISymbolNode,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) {
        this.parameters = new ArrayExt<ParameterType>(...symbolNode.getParameters().map(param => new paramDefinition(definitionFactory, param, this)));
    }

    fillParametersBySignature(
        definitionFactory: IDefinitionFactory,
        signature: ISignature,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) {
        this.parameters = new ArrayExt<ParameterType>(...signature.getParameters().map(param => new paramDefinition(definitionFactory, param, this)));
    }
}
