import {TypeExpressionDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";

export enum TypeFormatFlags {
    None = 1 << 0,
    WriteArrayAsGenericType = 1 << 1
}

export class TypeExpressionWriter extends BaseWriter {
    write(typeExpression: TypeExpressionDefinition, formatFlags = TypeFormatFlags.None) {
        let text = typeExpression.text;

        if ((formatFlags & TypeFormatFlags.WriteArrayAsGenericType) != 0 && this.isArrayType(text)) {
            text = this.getAsGenericArrayType(text);
        }

        this.writer.write(text);
    }

    private isArrayType(text: string) {
        return /\[\]$/.test(text);
    }

    private getAsGenericArrayType(text: string) {
        return "Array<" + text.substring(0, text.length - 2) + ">";
    }
}
