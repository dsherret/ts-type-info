import {Type} from "./type";
import {WrappedType} from "./../wrappers";

export class TypeExpression {
    text: string;
    types: Type[] = [];

    constructor(wrappedType: WrappedType) {
        this.text = wrappedType.getText();
    }

    addType(type: Type) {
        this.types.push(type);
    }
}
