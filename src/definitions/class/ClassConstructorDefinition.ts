import CodeBlockWriter from "code-block-writer";
import * as typeConstants from "./../../typeConstants";
import {StructureFactory} from "./../../factories";
import {ClassConstructorParameterStructure} from "./../../structures";
import {BaseDefinition, ParameteredDefinition, FunctionBodyWriteableDefinition, NodedDefinition} from "./../base";
import {applyMixins} from "./../../utils";
import {ScopedDefinition} from "./base";
import {ClassConstructorParameterDefinition} from "./ClassConstructorParameterDefinition";
import {Scope} from "./Scope";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure>, FunctionBodyWriteableDefinition,
            ScopedDefinition, NodedDefinition {
    addParameter(structure: ClassConstructorParameterStructure) {
        const def = new StructureFactory().getClassConstructorParameter(structure);
        this.parameters.push(def);
        return def;
    }

    // FunctionBodyWriteableDefinition
    onWriteFunctionBody: ((writer: CodeBlockWriter) => void) | null;
    // ParameteredDefinition
    parameters: ClassConstructorParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ClassConstructorParameterDefinition) => boolean)) => ClassConstructorParameterDefinition;
    // ScopedDefinition
    scope: Scope;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
}

applyMixins(ClassConstructorDefinition, BaseDefinition, [ParameteredDefinition, FunctionBodyWriteableDefinition, ScopedDefinition, NodedDefinition]);
