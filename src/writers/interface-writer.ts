import {InterfaceDefinition} from "./../definitions";
import {BaseWriter} from "./base-writer";
import {ExtendsImplementsClauseWriter} from "./extends-implements-clause-writer";
import {TypeParameterWriter} from "./type-parameter-writer";
import {PropertyWriter} from "./property-writer";
import {MethodWriter} from "./method-writer";
import {WriteFlags} from "./../write-flags";

export class InterfaceWriter extends BaseWriter {
    private typeParameterWriter = new TypeParameterWriter(this.writer);
    private propertyWriter = new PropertyWriter(this.writer);
    private methodWriter = new MethodWriter(this.writer);

    write(def: InterfaceDefinition, flags: WriteFlags) {
        this.writeHeader(def);
        this.writer.block(() => {
            this.writeProperties(def, flags);
            this.writer.newLine();
            this.writeMethods(def, flags);
        });
    }

    private writeHeader(def: InterfaceDefinition) {
        this.writeExportClause(def);
        this.writeDeclareClause(def);
        this.writer.write("interface ").write(def.name);
        this.typeParameterWriter.write(def.typeParameters);

        const extendsImplementsWriter = new ExtendsImplementsClauseWriter(this.writer);
        extendsImplementsWriter.writeExtends(def);
    }

    private writeProperties(def: InterfaceDefinition, flags: WriteFlags) {
        def.properties.forEach(p => {
            this.propertyWriter.write(p, flags);
        });
    }

    private writeMethods(def: InterfaceDefinition, flags: WriteFlags) {
        def.methods.forEach(m => {
            this.methodWriter.write(m, flags);
        });
    }
}
