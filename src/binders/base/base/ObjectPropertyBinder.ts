import {ObjectPropertyDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BasePropertyBinder} from "./BasePropertyBinder";
import {DefaultExpressionedBinder} from "./DefaultExpressionedBinder";

export abstract class ObjectPropertyBinder implements IBaseBinder {
    constructor(
        private basePropertyBinder: BasePropertyBinder,
        private defaultExpressionedBinder: DefaultExpressionedBinder
    ) {
    }

    bind(def: ObjectPropertyDefinition<any>) {
        this.basePropertyBinder.bind(def);
        this.defaultExpressionedBinder.bind(def);
    }
}
