import {Type} from "./Type";
import {ITypeExpression} from "./../wrappers";
import {ArrayExt} from "./../utils";

export class TypeExpression {
    text: string;
    types = new ArrayExt<Type>();

    constructor(typeExpression: ITypeExpression) {
        this.text = typeExpression.getText();
    }

    addType(type: Type) {
        this.types.push(type);
    }
}
