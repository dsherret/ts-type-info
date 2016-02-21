import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {applyMixins, MainCache} from "./../../utils";
import {ISymbolNode} from "./../../wrappers";
import {IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition, DefinitionType, BaseFunctionDefinition} from "./../base";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {FunctionParameterDefinition} from "./function-parameter-definition";

export class FunctionDefinition
        extends BaseFunctionDefinition<ModuledDefinitions, FunctionParameterDefinition>
        implements IExportableDefinition, IAmbientableDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(mainCache: MainCache, symbolNode: ISymbolNode) {
        super(mainCache, symbolNode, FunctionParameterDefinition, DefinitionType.Function);
        this.fillExportable(symbolNode);
        this.fillAmbientable(symbolNode);
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
    fillExportable: (symbolNode: ISymbolNode) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: ISymbolNode) => void;
}

applyMixins(FunctionDefinition, [ExportableDefinition, AmbientableDefinition]);
