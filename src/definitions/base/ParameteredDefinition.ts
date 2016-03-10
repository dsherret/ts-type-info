import {INode, ISignature} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {BaseParameterDefinitionConstructor} from "./BaseParameterDefinition";

export interface IParameteredDefinition<ParameterType> {
    fillParametersBySymbol(
        mainFactory: MainFactory,
        node: INode,
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
        node: INode,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) {
        this.parameters = new ArrayExt<ParameterType>(...node.getParameters().map(param => new paramDefinition(mainFactory, param, this)));
    }

    fillParametersBySignature(
        mainFactory: MainFactory,
        signature: ISignature,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType>
    ) {
        this.parameters = new ArrayExt<ParameterType>(...signature.getParameters().map(param => new paramDefinition(mainFactory, param.getOnlyNode(), this)));
    }
}
