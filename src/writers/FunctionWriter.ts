﻿import {FunctionDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {CallSignatureWriter} from "./CallSignatureWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {ParametersWriter} from "./ParametersWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";
import {FunctionReturnTypeWriter} from "./FunctionReturnTypeWriter";

export class FunctionWriter extends BaseDefinitionWriter<FunctionDefinition> {
    private callSignatureWriter = new CallSignatureWriter(this.writer);
    private typeParametersWriter = new TypeParametersWriter(this.writer);
    private parametersWriter = new ParametersWriter(this.writer);
    private functionBodyWriter = new FunctionBodyWriter(this.writer);
    private functionReturnTypeWriter = new FunctionReturnTypeWriter(this.writer);

    protected writeDefault(def: FunctionDefinition, flags: WriteFlags) {
        (def.overloadSignatures || []).forEach(s => {
            this.writeExportKeyword(def as FunctionDefinition, flags);
            this.writeDeclareKeyword(def as FunctionDefinition);
            this.writer.write("function ").write(def.name);
            this.callSignatureWriter.write(s, flags);
        });
        this.writeExportKeyword(def as FunctionDefinition, flags);
        this.writeDeclareKeyword(def as FunctionDefinition);
        this.writeAsyncKeyword(def as FunctionDefinition);
        this.writer.write("function ");
        this.writer.conditionalWrite(def.isGenerator, "*");
        this.writer.write(def.name);
        this.typeParametersWriter.write(def.typeParameters, flags);
        this.parametersWriter.write(def.parameters, flags);
        this.functionReturnTypeWriter.write(def, flags);
        this.functionBodyWriter.write(def, flags);
        this.writer.newLineIfLastNotNewLine();
    }
}
