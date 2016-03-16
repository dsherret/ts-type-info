import {Type} from "./../../expressions";
import {DefinitionType} from "./../base";
import {BasePropertyDefinition} from "./../base/BasePropertyDefinition";

export class TypePropertyDefinition extends BasePropertyDefinition<Type> {
    constructor() {
        super(DefinitionType.TypeProperty);
    }
}
