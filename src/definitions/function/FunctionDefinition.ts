import CodeBlockWriter from "code-block-writer";
import {StructureFactory} from "./../../factories";
import {FunctionParameterStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {ExportableDefinition, AmbientableDefinition, AsyncableDefinition, DefinitionType, BaseFunctionDefinition, FunctionBodyWriteableDefinition} from "./../base";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {FunctionParameterDefinition} from "./FunctionParameterDefinition";

export class FunctionDefinition
        extends BaseFunctionDefinition<FunctionParameterDefinition, FunctionParameterStructure>
        implements ExportableDefinition, AmbientableDefinition, AsyncableDefinition, FunctionBodyWriteableDefinition {

    constructor() {
        super(DefinitionType.Function);
    }

    addParameters(...parameters: FunctionParameterStructure[]) {
        const factory = new StructureFactory();
        this.parameters.push(...parameters.map(p => factory.getFunctionParameter(p)));
        return this;
    }

    write() {
        const writer = new CodeBlockWriter();
        const functionWriter = new FunctionWriter(writer);
        functionWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // AsyncableDefinition
    isAsync: boolean;
    // FunctionBodyWriteableDefinition
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(FunctionDefinition, BaseFunctionDefinition, [ExportableDefinition, AmbientableDefinition, AsyncableDefinition, FunctionBodyWriteableDefinition]);
