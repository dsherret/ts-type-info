import * as ts from "typescript";

export class TypeGuards {
    private constructor() {
    }

    static isCallExpression(expression: ts.Expression): expression is ts.CallExpression {
        return expression != null && (expression as ts.CallExpression).arguments != null;
    }

    static isLiteralExpression(expression: ts.Expression): expression is ts.LiteralExpression {
        return expression != null && (expression as ts.LiteralExpression).text != null;
    }
}
