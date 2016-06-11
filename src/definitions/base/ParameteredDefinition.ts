import {BaseParameterDefinition} from "./BaseParameterDefinition";
import {DefinitionUtils} from "./../../utils";

export abstract class ParameteredDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType> {
    parameters: ParameterType[] = [];
    abstract addParameter(structure: ParameterStructureType): ParameterType;

    getParameter(nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.parameters, nameOrSearchFunction);
    }
}
