import {IType} from "./../IType";
import {ITypeExpression} from "./../ITypeExpression";

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
