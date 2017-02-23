import {FunctionDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {CallSignatureWriter} from "./CallSignatureWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {ParametersWriter} from "./ParametersWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";
import {FunctionReturnTypeWriter} from "./FunctionReturnTypeWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";

export class FunctionWriter extends BaseDefinitionWriter<FunctionDefinition> {
    private readonly callSignatureWriter = new CallSignatureWriter(this.writer);
    private readonly typeParametersWriter = new TypeParametersWriter(this.writer);
    private readonly parametersWriter = new ParametersWriter(this.writer);
    private readonly functionBodyWriter = new FunctionBodyWriter(this.writer);
    private readonly functionReturnTypeWriter = new FunctionReturnTypeWriter(this.writer);
    private readonly documentationedWriter = new DocumentationedWriter(this.writer);

    protected writeDefault(def: FunctionDefinition, flags: WriteFlags) {
        this.documentationedWriter.write(def);
        (def.overloadSignatures || []).forEach(s => {
            this.writeStartOfFunctionHeader(def, flags);
            this.callSignatureWriter.write(s, flags);
        });
        this.writeImplementation(def, flags);
        this.writer.newLineIfLastNotNewLine();
    }

    private writeImplementation(def: FunctionDefinition, flags: WriteFlags) {
        // todo: look at this more
        if (def.overloadSignatures.length > 0 && def.isAmbient)
            return;

        const showImplementation = (def.overloadSignatures.length === 0 || (flags & WriteFlags.HideFunctionImplementations) === 0);

        if (showImplementation) {
            this.writeStartOfFunctionHeader(def, flags);
            this.typeParametersWriter.write(def.typeParameters, flags);
            this.parametersWriter.write(def, flags);
            this.functionReturnTypeWriter.write(def, flags);
            this.functionBodyWriter.write(def, flags);
        }
    }

    private writeStartOfFunctionHeader(def: FunctionDefinition, flags: WriteFlags) {
        this.writeExportKeyword(def as FunctionDefinition, flags);
        this.writeDeclareKeyword(def as FunctionDefinition);
        this.writeAsyncKeyword(def as FunctionDefinition);
        this.writer.write("function ");
        this.writer.conditionalWrite(def.isGenerator, "*");
        this.writer.write(def.name);
    }
}
