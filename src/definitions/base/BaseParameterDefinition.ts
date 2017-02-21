import * as typeConstants from "./../../typeConstants";
import {MainFactory} from "./../../factories";
import {ObjectPropertyStructure} from "./../../structures";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {TypeDefinition, ExpressionDefinition} from "./../expression";
import {ObjectPropertyDefinition} from "./../general/ObjectPropertyDefinition";
import {OptionallyNamedDefinition} from "./OptionallyNamedDefinition";
import {NamedDefinition} from "./NamedDefinition";
import {NodedDefinition} from "./NodedDefinition";
import {OptionalDefinition} from "./OptionalDefinition";
import {TypedDefinition} from "./TypedDefinition";
import {DefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BaseDefinition} from "./BaseDefinition";

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export abstract class BaseParameterDefinition
        extends BaseDefinition
        implements OptionallyNamedDefinition, OptionalDefinition, TypedDefinition, DefaultExpressionedDefinition, NodedDefinition {
    isRestParameter: boolean;
    destructuringProperties: ObjectPropertyDefinition[] = [];

    addDestructuringProperty(structure: ObjectPropertyStructure) {
        const def = new MainFactory().createStructureFactory().getObjectProperty(structure);
        this.destructuringProperties.push(def);
        return def;
    }

    getDestructuringProperty(nameOrSearchFunction: string | ((property: ObjectPropertyDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.destructuringProperties, nameOrSearchFunction);
    }

    // OptionallyNamedDefinition
    name: string | null;
    // OptionalDefinition
    isOptional: boolean;
    // TypedDefinition
    type: TypeDefinition;
    setType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[]) => this;
    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition | null;
    setDefaultExpression: (text: string) => this;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
}

applyMixins(BaseParameterDefinition, BaseDefinition, [OptionallyNamedDefinition, OptionalDefinition, TypedDefinition, DefaultExpressionedDefinition, NodedDefinition]);
