import {IType} from "./type";

export interface ITypeExpression {
    getText(): string;
    addType(type: IType): void;
    getTypes(): IType[];
}
