import {IType} from "./../type";
import {ITypeExpression} from "./../type-expression";

export class StructureTypeExpression implements ITypeExpression {
    getText() {
        return "";
    }

    addType(type: IType) {
        throw new Error("Not implemented");
    }

    getTypes(): IType[] {
        return [];
    }
}
