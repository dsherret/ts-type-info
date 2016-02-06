import {InterfaceDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./base-definition-writer";
import {ExtendsImplementsClauseWriter} from "./extends-implements-clause-writer";
import {TypeParametersWriter} from "./type-parameters-writer";
import {PropertyWriter} from "./property-writer";
import {MethodWriter} from "./method-writer";

export class InterfaceWriter extends BaseDefinitionWriter<InterfaceDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer, this.flags);
    private propertyWriter = new PropertyWriter(this.writer, this.flags);
    private methodWriter = new MethodWriter(this.writer, this.flags);

    protected writeDefault(def: InterfaceDefinition) {
        this.writeHeader(def);
        this.writer.block(() => {
            this.writeProperties(def);
            this.writer.newLine();
            this.writeMethods(def);
        });
    }

    private writeHeader(def: InterfaceDefinition) {
        this.writeExportClause(def);
        this.writeDeclareClause(def);
        this.writer.write("interface ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters);

        const extendsImplementsWriter = new ExtendsImplementsClauseWriter(this.writer, this.flags);
        extendsImplementsWriter.writeExtends(def);
    }

    private writeProperties(def: InterfaceDefinition) {
        def.properties.forEach(p => {
            this.propertyWriter.write(p);
        });
    }

    private writeMethods(def: InterfaceDefinition) {
        def.methods.forEach(m => {
            this.methodWriter.write(m);
        });
    }
}
