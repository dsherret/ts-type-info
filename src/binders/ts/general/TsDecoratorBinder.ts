import {ExpressionDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {TsExpressionBinder} from "./../../../binders";
import {NamedBinder, DecoratorBinder} from "./../../base";

export class TsDecoratorBinder extends DecoratorBinder {
    constructor(private node: TsNode) {
        super(new TsDecoratorNameBinder(node));
    }

    getArguments() {
        return this.node.getDecoratorArguments().map(arg => {
            const expression = new ExpressionDefinition();
            const binder = new TsExpressionBinder(arg);

            binder.bind(expression);

            return expression;
        });
    }
}

class TsDecoratorNameBinder extends NamedBinder {
    constructor(private node: TsNode) {
        super();
    }

    getName() {
        return this.node.getDecoratorName();
    }
}
