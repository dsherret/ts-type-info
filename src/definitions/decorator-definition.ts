import * as ts from "typescript";
import {IBaseNamedDefinition} from "./base";
import {ArgumentDefinition} from "./../definitions";
import {TypeGuards, Serializable} from "./../utils";

export class DecoratorDefinition implements IBaseNamedDefinition {
    private _name: string;
    private _arguments: ArgumentDefinition[] = [];

    constructor(decorator: ts.Decorator) {
        let decoratorExpression = decorator.expression;

        this.fillName(decoratorExpression);

        if (TypeGuards.isCallExpression(decoratorExpression)) {
            this.fillArguments(decoratorExpression.arguments);
        }
    }

    @Serializable
    get name() {
        return this._name;
    }

    @Serializable
    get arguments() {
        return this._arguments;
    }

    private fillName(decoratorExpression: ts.LeftHandSideExpression) {
        if (TypeGuards.isLiteralExpression(decoratorExpression)) {
            this._name = decoratorExpression.text;
        }
        else if (decoratorExpression != null) {
            this.fillName((decoratorExpression as any)["expression"] as ts.LiteralExpression);
        }
        else {
            throw "Unhandled: The decorator expression was null";
        }
    }

    private fillArguments(args: ts.NodeArray<ts.Expression>) {
        for (let arg of args) {
            this._arguments.push(new ArgumentDefinition(arg));
        }
    }
}
