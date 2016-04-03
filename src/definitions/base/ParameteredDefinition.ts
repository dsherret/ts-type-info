export abstract class ParameteredDefinition<ParameterType, ParameterStructureType> {
    parameters: ParameterType[] = [];
    abstract addParameters(...parameters: ParameterStructureType[]): this;
}
