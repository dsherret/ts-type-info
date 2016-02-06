export enum WriteFlags {
    None = 0,
    HideExpressions = 1 << 0,
    HideFunctionBodies = 1 << 1,
    HidePrivateMembers = 1 << 2,
    HideProtectedMembers = 1 << 3,
    Default = None
}
