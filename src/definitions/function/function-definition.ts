import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {FunctionStructure, FunctionParameterStructure, ExportableStructure, AmbientableStructure} from "./../../structures";
import {IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition, DefinitionType, BaseFunctionDefinition} from "./../base";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {FunctionParameterDefinition} from "./function-parameter-definition";

export class FunctionDefinition
        extends BaseFunctionDefinition<ModuledDefinitions, FunctionParameterDefinition, FunctionParameterStructure>
        implements IExportableDefinition, IAmbientableDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(symbolNodeOrStructure: WrappedSymbolNode | FunctionStructure) {
        super(symbolNodeOrStructure, FunctionParameterDefinition, DefinitionType.Function);
        this.fillExportable(symbolNodeOrStructure);
        this.fillAmbientable(symbolNodeOrStructure);
    }

    write() {
        const writer = new CodeBlockWriter();
        const functionWriter = new FunctionWriter(writer, WriteFlags.Default);
        functionWriter.write(this);
        return writer.toString();
    }

    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (symbolNodeOrStructure: WrappedSymbolNode | ExportableStructure) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNodeOrStructure: WrappedSymbolNode | AmbientableStructure) => void;
}

applyMixins(FunctionDefinition, [ExportableDefinition, AmbientableDefinition]);
