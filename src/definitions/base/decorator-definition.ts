import * as ts from "typescript";
import {IBaseNamedDefinition} from "./named-definition";
import {Expression} from "./../../expressions";
import {TypeChecker, TypeGuards} from "./../../utils";

export class DecoratorDefinition implements IBaseNamedDefinition {
    private _name: string;
    private _arguments: Expression[] = [];

    constructor(typeChecker: TypeChecker, decorator: ts.Decorator) {
        let decoratorExpression = decorator.expression;

        this.fillName(decoratorExpression);

        if (TypeGuards.isCallExpression(decoratorExpression)) {
            this.fillArguments(typeChecker, decoratorExpression.arguments);
        }
    }

    get name() {
        return this._name;
    }

    get arguments() {
        return this._arguments;
    }

    private fillName(decoratorExpression: ts.LeftHandSideExpression) {
        /* istanbul ignore else */
        if (TypeGuards.isLiteralExpression(decoratorExpression)) {
            this._name = decoratorExpression.text;
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
            this._arguments.push(new Expression(typeChecker, arg));
        }
    }
}
