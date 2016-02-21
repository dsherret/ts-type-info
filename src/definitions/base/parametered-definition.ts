import {ISymbolNode, ISignature} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";

export interface IParameteredDefinition<ParameterType> {
    fillParametersBySymbol(
        mainFactory: MainFactory,
        symbolNode: ISymbolNode,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ): void;
    fillParametersBySignature(
        mainFactory: MainFactory,
        signature: ISignature,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ): void;
    parameters: ArrayExt<ParameterType>;
}

export abstract class ParameteredDefinition<ParameterType>
        implements IParameteredDefinition<ParameterType> {
    parameters: ArrayExt<ParameterType>;

    fillParametersBySymbol(
        mainFactory: MainFactory,
        symbolNode: ISymbolNode,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) {
        this.parameters = new ArrayExt<ParameterType>(...symbolNode.getParameters().map(param => new paramDefinition(mainFactory, param, this)));
    }

    fillParametersBySignature(
        mainFactory: MainFactory,
        signature: ISignature,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) {
        this.parameters = new ArrayExt<ParameterType>(...signature.getParameters().map(param => new paramDefinition(mainFactory, param, this)));
    }
}
