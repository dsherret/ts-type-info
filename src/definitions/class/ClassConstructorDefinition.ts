import CodeBlockWriter from "code-block-writer";
import {StructureFactory} from "./../../factories";
import {ClassConstructorParameterStructure} from "./../../structures";
import {BaseDefinition, ParameteredDefinition, FunctionBodyWriteableDefinition} from "./../base";
import {applyMixins} from "./../../utils";
import {ScopedDefinition} from "./base";
import {ClassConstructorParameterDefinition} from "./ClassConstructorParameterDefinition";
import {Scope} from "./Scope";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure>, FunctionBodyWriteableDefinition,
            ScopedDefinition {
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
}

applyMixins(ClassConstructorDefinition, BaseDefinition, [ParameteredDefinition, FunctionBodyWriteableDefinition, ScopedDefinition]);
