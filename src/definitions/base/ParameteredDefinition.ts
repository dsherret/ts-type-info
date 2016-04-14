import {BaseParameterDefinition} from "./BaseParameterDefinition";
import {DefinitionUtils} from "./../../utils";

export abstract class ParameteredDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> {
    parameters: ParameterType[] = [];
    abstract addParameters(...parameters: ParameterStructureType[]): this;

    getParameter(nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) {
        return DefinitionUtils.getDefinitionFromList(this.parameters, nameOrSearchFunction);
    }
}
