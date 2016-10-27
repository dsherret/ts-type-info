import * as typeConstants from "./../../typeConstants";
import {MainFactory} from "./../../factories";
import {TypeParameterStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {TypeAliasWriter} from "./../../writers";
import {BaseDefinition, NodedDefinition} from "./../base";
import {TypeDefinition} from "./../expression";
// specify of specific file here to prevent errors (due to type-parameter being referenced in type-parametered-definition)
import {NamedDefinition} from "./../base/NamedDefinition";
import {OrderableDefinition} from "./../base/OrderableDefinition";
import {TypeParameteredDefinition} from "./../base/TypeParameteredDefinition";
import {TypedDefinition} from "./../base/TypedDefinition";
import {ExportableDefinition} from "./../base/ExportableDefinition";
import {AmbientableDefinition} from "./../base/AmbientableDefinition";
import {DocumentationedDefinition} from "./../base/DocumentationedDefinition";
import {TypeParameterDefinition} from "./TypeParameterDefinition";

export class TypeAliasDefinition
        extends BaseDefinition
        implements NamedDefinition, AmbientableDefinition, ExportableDefinition, OrderableDefinition, TypedDefinition, TypeParameteredDefinition, NodedDefinition,
            DocumentationedDefinition {
    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const typeAliasWriter = new TypeAliasWriter(writer);
        typeAliasWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // OrderableDefinition
    order: number;
    // TypedDefinition
    type: TypeDefinition;
    setType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[]) => this;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => (TypeParameterDefinition | null);
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // DocumentationedDefinition
    documentationComment: string;
}

applyMixins(TypeAliasDefinition, BaseDefinition, [NamedDefinition, AmbientableDefinition, OrderableDefinition, ExportableDefinition, TypedDefinition,
    TypeParameteredDefinition, NodedDefinition, DocumentationedDefinition]);
