import {DefaultExpressionedStructure} from "./../../../structures";
import {ExpressionDefinition} from "./../../../definitions";
import {StructureExpressionBinder} from "./../expressions";
import {DefaultExpressionedBinder} from "./../../base";

export class StructureDefaultExpressionedBinder extends DefaultExpressionedBinder {
    constructor(private structure: DefaultExpressionedStructure) {
        super();
    }

    getDefaultExpression() {
        return this.structure.defaultExpression == null ? null : this.getExpression(this.structure.defaultExpression);
    }

    private getExpression(expression: string) {
        const def = new ExpressionDefinition();
        const binder = new StructureExpressionBinder(expression);
        binder.bind(def);
        return def;
    }
}
