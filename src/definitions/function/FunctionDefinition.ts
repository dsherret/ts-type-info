import CodeBlockWriter from "code-block-writer";
import {MainFactory, StructureFactory} from "./../../factories";
import {FunctionParameterStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {ExportableDefinition, AmbientableDefinition, AsyncableDefinition, BaseFunctionDefinition, FunctionBodyWriteableDefinition,
    OrderableDefinition} from "./../base";
import {FunctionParameterDefinition} from "./FunctionParameterDefinition";

export class FunctionDefinition
        extends BaseFunctionDefinition<FunctionParameterDefinition, FunctionParameterStructure>
        implements ExportableDefinition, AmbientableDefinition, AsyncableDefinition, FunctionBodyWriteableDefinition, OrderableDefinition {

    addParameter(structure: FunctionParameterStructure) {
        const def = new StructureFactory().getFunctionParameter(structure);
        this.parameters.push(def);
        return def;
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const functionWriter = new FunctionWriter(writer);
        functionWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // AsyncableDefinition
    isAsync: boolean;
    // FunctionBodyWriteableDefinition
    onWriteFunctionBody: ((writer: CodeBlockWriter) => void) | null;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    // OrderableDefinition
    order: number;
}

applyMixins(FunctionDefinition, BaseFunctionDefinition, [ExportableDefinition, AmbientableDefinition, AsyncableDefinition, FunctionBodyWriteableDefinition,
    OrderableDefinition]);
