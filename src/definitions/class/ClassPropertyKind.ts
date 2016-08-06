export enum ClassPropertyKind {
    Normal = 0,
    GetAccessor = 1 << 0,
    SetAccessor = 1 << 2,
    GetSetAccessor = GetAccessor | SetAccessor
}
