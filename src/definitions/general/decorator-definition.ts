import * as ts from "typescript";
import {IBaseNamedDefinition, IParentedDefinition} from "./../base";
import {Expression} from "./../../expressions";
import {TypeChecker, TypeGuards} from "./../../utils";

export class DecoratorDefinition<ParentType> implements IBaseNamedDefinition, IParentedDefinition<ParentType> {
    arguments: Expression[] = [];

    constructor(typeChecker: TypeChecker, decorator: ts.Decorator, parent: ParentType) {
        let decoratorExpression = decorator.expression;

        this.fillName(decoratorExpression);

        if (TypeGuards.isCallExpression(decoratorExpression)) {
            this.fillArguments(typeChecker, decoratorExpression.arguments);
        }

        this.parent = parent;
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

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
}
