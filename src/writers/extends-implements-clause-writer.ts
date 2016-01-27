import {ClassDefinition, InterfaceDefinition} from "./../definitions";
import {TypeExpression} from "./../expressions";
import {BaseWriter} from "./base-writer";

export class ExtendsImplementsClauseWriter extends BaseWriter {
    writeExtends(def: ClassDefinition | InterfaceDefinition) {
        this.writeClause({
            word: "extends",
            typeExpressions: def.extendsTypeExpressions
        });

        return this;
    }

    writeImplements(def: ClassDefinition) {
        this.writeClause({
            word: "implements",
            typeExpressions: def.implementsTypeExpressions
        });

        return this;
    }

    private writeClause(obj: { word: string, typeExpressions: TypeExpression[] }) {
        if (obj.typeExpressions.length > 0) {
            this.writer.write(` ${obj.word} `);
            this.writeTypeExpressions(obj.typeExpressions);
        }
    }

    private writeTypeExpressions(typeExpressions: TypeExpression[]) {
        typeExpressions.forEach((t, i) => {
            if (i !== 0) {
                this.writer.write(", ");
            }

            this.writer.write(t.text);
        });
    }
}
