export enum WriteFlags {
    None = 0,
    PropertyExpressions = 1 << 0,
    ParameterDefaultExpressions = 1 << 1,
    HideFunctionBodies = 1 << 2,
    Expressions = PropertyExpressions | ParameterDefaultExpressions,
    All = PropertyExpressions | ParameterDefaultExpressions | Expressions
}
