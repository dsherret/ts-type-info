import CodeBlockWriter from "code-block-writer";
import {ClassDefinition, InterfaceDefinition, TypeDefinition} from "./../definitions";

export class ExtendsImplementsClauseWriter {
    constructor(private readonly writer: CodeBlockWriter) {
    }

    writeExtends(def: ClassDefinition | InterfaceDefinition) {
        this.writeClause({
            word: "extends",
            types: def.extendsTypes
        });
    }

    writeImplements(def: ClassDefinition) {
        this.writeClause({
            word: "implements",
            types: def.implementsTypes
        });
    }

    private writeClause(obj: { word: string, types: TypeDefinition[] }) {
        if (obj.types.length === 0)
            return;

        this.writer.write(` ${obj.word} `);
        this.writeTypes(obj.types);
    }

    private writeTypes(types: TypeDefinition[]) {
        types.forEach((t, i) => {
            this.writer.conditionalWrite(i !== 0, ", ");
            this.writer.write(this.toGenericArrayIfArray(t.text));
        });
    }

    private toGenericArrayIfArray(str: string) {
        return str.replace(/^(.*)\[\]$/, "Array<$1>");
    }
}
