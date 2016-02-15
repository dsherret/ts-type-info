import {Type} from "./type";
import {WrappedType} from "./../wrappers";
import {ExtendedArray} from "./../utils";

export class TypeExpression {
    text: string;
    types = new ExtendedArray<Type>();

    constructor(wrappedType: WrappedType) {
        this.text = wrappedType.getText();
    }

    addType(type: Type) {
        this.types.push(type);
    }
}
