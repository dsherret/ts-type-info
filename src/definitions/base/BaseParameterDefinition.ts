import {StructureFactory} from "./../../factories";
import {ObjectPropertyStructure} from "./../../structures";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {TypeExpressionDefinition, ExpressionDefinition} from "./../expression";
import {ObjectPropertyDefinition} from "./../general/ObjectPropertyDefinition";
import {NamedDefinition} from "./NamedDefinition";
import {TypeExpressionedDefinition} from "./TypeExpressionedDefinition";
import {DefaultExpressionedDefinition} from "./DefaultExpressionedDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";

export interface BaseParameterDefinitionConstructor<ParameterType> {
    new(): ParameterType;
}

export abstract class BaseParameterDefinition extends BaseDefinition implements NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;
    destructuringProperties: ObjectPropertyDefinition[] = [];

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    addDestructuringProperties(...properties: ObjectPropertyStructure[]) {
        const factory = new StructureFactory();
        this.destructuringProperties.push(...properties.map(p => factory.getObjectProperty(p)));
        return this as any; // todo: type this in TypeScript 2.0
    }

    getDestructuringProperty(nameOrSearchFunction: string | ((property: ObjectPropertyDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.destructuringProperties, nameOrSearchFunction);
    }

    // NamedDefinition
    name: string;
    // TypeExpressionedDefinition
    typeExpression: TypeExpressionDefinition;
    setTypeExpression: (text: string) => any;
    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition;
}

applyMixins(BaseParameterDefinition, BaseDefinition, [NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);
