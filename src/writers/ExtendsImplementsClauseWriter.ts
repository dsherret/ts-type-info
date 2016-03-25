import {ClassDefinition, InterfaceDefinition, ExpressionDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";
import {ExpressionWriter} from "./ExpressionWriter";

export class ExtendsImplementsClauseWriter extends BaseWriter {
    private expressionWriter = new ExpressionWriter(this.writer, this.flags);

    writeExtends(def: ClassDefinition | InterfaceDefinition) {
        this.writeClause({
            word: "extends",
            expressions: def.extendsTypeExpressions
        });

        return this;
    }

    writeImplements(def: ClassDefinition) {
        this.writeClause({
            word: "implements",
            expressions: def.implementsTypeExpressions
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

            this.expressionWriter.write(t);
        });
    }
}
