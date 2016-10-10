import CodeBlockWriter from "code-block-writer";
import * as typeConstants from "./../../typeConstants";
import {StructureFactory} from "./../../factories";
import {ClassConstructorParameterStructure, CallSignatureStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {BaseDefinition, ParameteredDefinition, FunctionBodyWriteableDefinition, NodedDefinition, OverloadSignaturedDefinition} from "./../base";
import {CallSignatureDefinition} from "./../general";
import {ScopedDefinition} from "./base";
import {ClassConstructorParameterDefinition} from "./ClassConstructorParameterDefinition";
import {Scope} from "./Scope";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure>, FunctionBodyWriteableDefinition,
            ScopedDefinition, NodedDefinition, OverloadSignaturedDefinition {
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
    // OverloadSignaturedDefinition
    overloadSignatures: CallSignatureDefinition[];
    addOverloadSignature: (structure: CallSignatureStructure) => CallSignatureDefinition;
    getOverloadSignature: (searchFunction: (method: CallSignatureDefinition) => boolean) => CallSignatureDefinition | null;
}

applyMixins(ClassConstructorDefinition, BaseDefinition, [ParameteredDefinition, FunctionBodyWriteableDefinition, ScopedDefinition, NodedDefinition,
    OverloadSignaturedDefinition]);
