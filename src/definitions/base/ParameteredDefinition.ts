import {ArrayExt} from "./../../utils";

export abstract class ParameteredDefinition<ParameterType> {
    parameters = new ArrayExt<ParameterType>();
}
