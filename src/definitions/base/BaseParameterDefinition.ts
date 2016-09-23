import {StructureFactory} from "./../../factories";
import {ObjectPropertyStructure} from "./../../structures";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {TypeNodeDefinition, ExpressionDefinition} from "./../expression";
import {ObjectPropertyDefinition} from "./../general/ObjectPropertyDefinition";
import {OptionallyNamedDefinition} from "./OptionallyNamedDefinition";
import {NamedDefinition} from "./NamedDefinition";
import {OptionalDefinition} from "./OptionalDefinition";
import {TypedDefinition} from "./TypedDefinition";
import {DefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export abstract class BaseParameterDefinition extends BaseDefinition implements OptionallyNamedDefinition, OptionalDefinition, TypedDefinition, DefaultExpressionedDefinition {
    isRestParameter: boolean;
    destructuringProperties: ObjectPropertyDefinition[] = [];

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    addDestructuringProperty(structure: ObjectPropertyStructure) {
        const def = new StructureFactory().getObjectProperty(structure);
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
    type: TypeNodeDefinition;
    setType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[]) => this;
    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition | null;
    setDefaultExpression: (text: string) => this;
}

applyMixins(BaseParameterDefinition, BaseDefinition, [OptionallyNamedDefinition, OptionalDefinition, TypedDefinition, DefaultExpressionedDefinition]);
