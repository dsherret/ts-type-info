import {InterfaceDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {CallSignatureWriter} from "./CallSignatureWriter";
import {ExtendsImplementsClauseWriter} from "./ExtendsImplementsClauseWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {PropertyWriter} from "./PropertyWriter";
import {MethodWriter} from "./MethodWriter";

export class InterfaceWriter extends BaseDefinitionWriter<InterfaceDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer);
    private propertyWriter = new PropertyWriter(this.writer);
    private methodWriter = new MethodWriter(this.writer);
    private callSignatureWriter = new CallSignatureWriter(this.writer);

    protected writeDefault(def: InterfaceDefinition, flags: WriteFlags) {
        this.writeHeader(def, flags);
        this.writer.block(() => {
            this.writeNewSignatures(def, flags);
            this.writeCallSignatures(def, flags);
            this.writeProperties(def, flags);
            this.writer.newLine();
            this.writeMethods(def, flags);
        });
    }

    private writeHeader(def: InterfaceDefinition, flags: WriteFlags) {
        this.writeExportClause(def, flags);
        this.writeDeclareClause(def);
        this.writer.write("interface ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters, flags);

        const extendsImplementsWriter = new ExtendsImplementsClauseWriter(this.writer);
        extendsImplementsWriter.writeExtends(def);
    }

    private writeNewSignatures(def: InterfaceDefinition, flags: WriteFlags) {
        def.newSignatures.forEach(n => {
            this.writer.write("new");
            this.callSignatureWriter.write(n, flags);
        });
    }

    private writeCallSignatures(def: InterfaceDefinition, flags: WriteFlags) {
        def.callSignatures.forEach(c => {
            this.callSignatureWriter.write(c, flags);
        });
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
