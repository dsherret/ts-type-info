import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {INode} from "./../../wrappers";
import {IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition, DefinitionType, BaseFunctionDefinition} from "./../base";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {FunctionParameterDefinition} from "./FunctionParameterDefinition";

export class FunctionDefinition
        extends BaseFunctionDefinition<ModuledDefinitions, FunctionParameterDefinition>
        implements IExportableDefinition, IAmbientableDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(mainFactory: MainFactory, node: INode) {
        super(mainFactory, node, FunctionParameterDefinition, DefinitionType.Function);
        this.fillExportable(node);
        this.fillAmbientable(node);
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
    fillExportable: (node: INode) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (node: INode) => void;
}

applyMixins(FunctionDefinition, [ExportableDefinition, AmbientableDefinition]);
