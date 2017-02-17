export enum WriteFlags {
    None = 0,
    HideExpressions = 1 << 0,
    HideFunctionBodies = 1 << 1,
    HidePrivateMembers = 1 << 2,
    HideProtectedMembers = 1 << 3,
    HideScopeOnParameters = 1 << 4, // todo: need a better name because it includes "readonly"
    IsInAmbientContext = 1 << 5,
    HideFunctionImplementations = 1 << 6,
    Default = None
}
