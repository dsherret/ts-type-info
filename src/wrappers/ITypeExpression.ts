import {IType} from "./IType";

export interface ITypeExpression {
    getText(): string;
    addType(type: IType): void;
    getTypes(): IType[];
}
