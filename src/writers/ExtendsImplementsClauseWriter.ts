import {ClassDefinition, InterfaceDefinition, ExpressionDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";
import {ExpressionWriter} from "./ExpressionWriter";

export class ExtendsImplementsClauseWriter extends BaseWriter {
    private expressionWriter = new ExpressionWriter(this.writer);

    writeExtends(def: ClassDefinition | InterfaceDefinition) {
        this.writeClause({
            word: "extends",
            expressions: def.extendsTypes
        });

        return this;
    }

    writeImplements(def: ClassDefinition) {
        this.writeClause({
            word: "implements",
            expressions: def.implementsTypes
        });

        return this;
    }

    private writeClause(obj: { word: string, expressions: ExpressionDefinition[] }) {
        if (obj.expressions.length > 0) {
            this.writer.write(` ${obj.word} `);
            this.writeExpressions(obj.expressions);
        }
    }

    private writeExpressions(expressions: ExpressionDefinition[]) {
        expressions.forEach((t, i) => {
            if (i !== 0) {
                this.writer.write(", ");
            }

            t.text = this.toGenericArrayIfArray(t.text);

            this.expressionWriter.write(t);
        });
    }

    private toGenericArrayIfArray(str: string) {
        return str.replace(/(.*)\[\]$/, "Array<$1>");
    }
}
