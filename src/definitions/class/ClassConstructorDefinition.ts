import CodeBlockWriter from "code-block-writer";
import * as typeConstants from "./../../typeConstants";
import {MainFactory} from "./../../factories";
import {ClassConstructorParameterStructure, CallSignatureStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {BaseDefinition, ParameteredDefinition, FunctionBodyWriteableDefinition, NodedDefinition, OverloadSignaturedDefinition, DocumentationedDefinition} from "./../base";
import {CallSignatureDefinition} from "./../general";
import {ScopedDefinition} from "./base";
import {ClassConstructorParameterDefinition} from "./ClassConstructorParameterDefinition";
import {Scope} from "./Scope";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements ParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure>, FunctionBodyWriteableDefinition,
            ScopedDefinition, NodedDefinition, OverloadSignaturedDefinition, DocumentationedDefinition {
    addParameter(structure: ClassConstructorParameterStructure) {
        const def = new MainFactory().createStructureFactory().getClassConstructorParameter(structure);
        this.parameters.push(def);
        return def;
    }

    // FunctionBodyWriteableDefinition
    onWriteFunctionBody: ((writer: CodeBlockWriter) => void) | null;
    // ParameteredDefinition
    parameters: ClassConstructorParameterDefinition[];
    getParameter: (nameOrSearchFunction: string | ((parameter: ClassConstructorParameterDefinition) => boolean)) => (ClassConstructorParameterDefinition | null);
    // ScopedDefinition
    scope: Scope;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // OverloadSignaturedDefinition
    overloadSignatures: CallSignatureDefinition[];
    addOverloadSignature: (structure: CallSignatureStructure) => CallSignatureDefinition;
    getOverloadSignature: (searchFunction: (method: CallSignatureDefinition) => boolean) => (CallSignatureDefinition | null);
    // DocumentationedDefinition
    documentationComment: string;
}

applyMixins(ClassConstructorDefinition, BaseDefinition, [ParameteredDefinition, FunctionBodyWriteableDefinition, ScopedDefinition, NodedDefinition,
    OverloadSignaturedDefinition, DocumentationedDefinition]);
