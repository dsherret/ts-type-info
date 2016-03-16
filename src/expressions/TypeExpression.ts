import {Type} from "./Type";
import {TsTypeExpression} from "./../wrappers";
import {ArrayExt} from "./../utils";

export class TypeExpression {
    text: string;
    types = new ArrayExt<Type>();

    constructor(typeExpression: TsTypeExpression) {
        this.text = typeExpression.getText();
    }

    addType(type: Type) {
        this.types.push(type);
    }
}
