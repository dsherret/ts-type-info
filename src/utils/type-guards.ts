import * as ts from "typescript";

export module TypeGuards {
    export function isCallExpression(expression: ts.Expression): expression is ts.CallExpression {
        return expression != null && (expression as ts.CallExpression).arguments != null;
    }

    export function isLiteralExpression(expression: ts.Expression): expression is ts.LiteralExpression {
        return expression != null && (expression as ts.LiteralExpression).text != null;
    }
}
