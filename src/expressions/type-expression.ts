import {Type} from "./type";
import {WrappedType} from "./../wrappers";
import {ArrayExt} from "./../utils";

export class TypeExpression {
    text: string;
    types = new ArrayExt<Type>();

    constructor(wrappedType: WrappedType) {
        this.text = wrappedType.getText();
    }

    addType(type: Type) {
        this.types.push(type);
    }
}
