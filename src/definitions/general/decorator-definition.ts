import * as ts from "typescript";
import {IBaseNamedDefinition} from "./../base";
import {Expression} from "./../../expressions";
import {TypeChecker, TypeGuards} from "./../../utils";

export class DecoratorDefinition implements IBaseNamedDefinition {
    name: string;
    arguments: Expression[] = [];

    constructor(typeChecker: TypeChecker, decorator: ts.Decorator) {
        let decoratorExpression = decorator.expression;

        this.fillName(decoratorExpression);

        if (TypeGuards.isCallExpression(decoratorExpression)) {
            this.fillArguments(typeChecker, decoratorExpression.arguments);
        }
    }

    private fillName(decoratorExpression: ts.LeftHandSideExpression) {
        /* istanbul ignore else */
        if (TypeGuards.isLiteralExpression(decoratorExpression)) {
            this.name = decoratorExpression.text;
        }
        else if (decoratorExpression != null) {
            this.fillName((decoratorExpression as any)["expression"] as ts.LiteralExpression);
        }
        else {
            console.warn("Unhandled: The decorator expression was null");
        }
    }

    private fillArguments(typeChecker: TypeChecker, args: ts.NodeArray<ts.Expression>) {
        for (let arg of args) {
            this.arguments.push(new Expression(typeChecker, arg));
        }
    }
}
