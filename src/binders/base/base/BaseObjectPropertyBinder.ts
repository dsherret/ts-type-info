import {BaseObjectPropertyDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BasePropertyBinder} from "./BasePropertyBinder";
import {DefaultExpressionedBinder} from "./DefaultExpressionedBinder";

export abstract class BaseObjectPropertyBinder implements IBaseBinder {
    constructor(
        private basePropertyBinder: BasePropertyBinder,
        private defaultExpressionedBinder: DefaultExpressionedBinder
    ) {
    }

    bind(def: BaseObjectPropertyDefinition) {
        this.basePropertyBinder.bind(def);
        this.defaultExpressionedBinder.bind(def);
    }
}
