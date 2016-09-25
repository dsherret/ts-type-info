export enum ClassPropertyKind {
    Normal = 0,
    GetAccessor = 1 << 0,
    SetAccessor = 1 << 1,
    GetSetAccessor = GetAccessor | SetAccessor
}
