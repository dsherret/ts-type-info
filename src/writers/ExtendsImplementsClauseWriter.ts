import {ClassDefinition, InterfaceDefinition, TypeExpressionDefinition} from "./../definitions";
import {BaseWriter} from "./BaseWriter";
import {TypeExpressionWriter} from "./TypeExpressionWriter";

export class ExtendsImplementsClauseWriter extends BaseWriter {
    private typeExpressionWriter = new TypeExpressionWriter(this.writer, this.flags);

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

    private writeClause(obj: { word: string, typeExpressions: TypeExpressionDefinition[] }) {
        if (obj.typeExpressions.length > 0) {
            this.writer.write(` ${obj.word} `);
            this.writeTypeExpressions(obj.typeExpressions);
        }
    }

    private writeTypeExpressions(typeExpressions: TypeExpressionDefinition[]) {
        typeExpressions.forEach((t, i) => {
            if (i !== 0) {
                this.writer.write(", ");
            }

            this.typeExpressionWriter.write(t);
        });
    }
}
