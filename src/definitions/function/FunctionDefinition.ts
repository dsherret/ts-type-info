import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {ExportableDefinition, AmbientableDefinition, DefinitionType, BaseFunctionDefinition} from "./../base";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {FunctionParameterDefinition} from "./FunctionParameterDefinition";

export class FunctionDefinition
        extends BaseFunctionDefinition<FunctionParameterDefinition>
        implements ExportableDefinition, AmbientableDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor() {
        super(DefinitionType.Function);
    }

    write() {
        const writer = new CodeBlockWriter();
        const functionWriter = new FunctionWriter(writer);
        functionWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(FunctionDefinition, BaseFunctionDefinition, [ExportableDefinition, AmbientableDefinition]);
