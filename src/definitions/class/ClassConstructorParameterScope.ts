import {Scope} from "./Scope";

export type ClassConstructorParameterScope = "none" | "public" | "protected" | "private";

export const ClassConstructorParameterScope = {
    None: "none" as ClassConstructorParameterScope,
    Public: "public" as ClassConstructorParameterScope,
    Protected: "protected" as ClassConstructorParameterScope,
    Private: "private" as ClassConstructorParameterScope,
    toScope(scope: ClassConstructorParameterScope) {
        switch (scope) {
            case ClassConstructorParameterScope.Public:
                return Scope.Public;
            case ClassConstructorParameterScope.Protected:
                return Scope.Protected;
            case ClassConstructorParameterScope.Private:
                return Scope.Private;
            case ClassConstructorParameterScope.None:
                throw new Error("Unexpected conversion of ClassConstructorParameterScope.None to Scope");
            default:
                throw new Error(`Not implemented ClassConstructorParameterScope: ${scope}`);
        }
    }
};
