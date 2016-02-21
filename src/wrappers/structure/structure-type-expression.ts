import {IType} from "./../type";
import {ITypeExpression} from "./../type-expression";

export class StructureTypeExpression implements ITypeExpression {
    constructor(private expressionText: string) {
    }

    getText() {
        return this.expressionText;
    }

    addType(type: IType) {
        throw new Error("Not implemented");
    }

    getTypes(): IType[] {
        return [];
    }
}
